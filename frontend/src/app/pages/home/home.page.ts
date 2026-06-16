import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';
import { CampaignService } from 'src/app/services/campaign.service';
import {
  CampaignItem,
  CampaignPayload
} from 'src/app/interfaces/campaign.interface';
import { ProfileDetailsResponse } from 'src/app/interfaces/profile.interface';
import { environment } from 'src/environments/environment';

import { UploadService } from
  'src/app/services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public readonly serverUrl = environment.serverUrl;

  user: any;

  profileDetails: ProfileDetailsResponse | null = null;

  showProfileDetails = false;

  selectedTab = 'live';

  campaigns: CampaignItem[] = [];

  selectedImageUrl = '';

  portfolioItems: any[] = [];

  uploadingPortfolio = false;

  loading = false;

  saving = false;

  applyingCampaignId = '';

  message = '';

  errorMessage = '';

  campaignForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private campaignService: CampaignService,
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.campaignForm = this.fb.group({
      campaignTitle: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      platform: ['', Validators.required],
      budgetPerInfluencer: [0, Validators.required],
      totalSlots: [1, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.auth.getProfile().subscribe({
      next: (res: any) => {
        this.user = res;
        this.loadCampaigns();

        this.loadPortfolio();
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleProfileDetails() {
    this.showProfileDetails = !this.showProfileDetails;

    if (this.showProfileDetails && !this.profileDetails) {
      this.auth.getProfileDetails().subscribe({
        next: (res) => {
          this.profileDetails = res;
        },
        error: () => {
          this.errorMessage = 'Could not load profile details.';
        }
      });
    }
  }

  selectTab(tab: any) {
    this.selectedTab = tab;
  }

  loadCampaigns() {
    this.loading = true;

    const request = this.user?.role === 'brand' && this.user?._id
      ? this.campaignService.getBrandCampaigns(this.user._id)
      : this.campaignService.getCampaigns();

    request.subscribe({
      next: (res: any) => {
        const items = Array.isArray(res) ? res : [];
        this.campaigns = this.user?.role === 'brand'
          ? items
          : items.filter((campaign: CampaignItem) => campaign.status === 'active');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load campaigns.';
      }
    });
  }

  createCampaign() {

    if (this.campaignForm.invalid) {

      this.campaignForm.markAllAsTouched();

      this.errorMessage =
        'Please fill all fields';

      return;
    }
    if (!this.user?._id) {
      return;
    }

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    const formValue = this.campaignForm.value;

    const payload: CampaignPayload = {
      ...formValue,
      budgetPerInfluencer: Number(formValue.budgetPerInfluencer),
      totalSlots: Number(formValue.totalSlots),
      brandId: this.user._id,
      brandName:
        this.user.username ||
        this.user.email
    };

    this.campaignService.createCampaign(payload).subscribe({
      next: () => {
        this.saving = false;
        this.message = 'Campaign created successfully.';
        this.campaignForm.reset({
          campaignTitle: '',
          description: '',
          category: '',
          platform: '',
          budgetPerInfluencer: 0,
          totalSlots: 1,
          startDate: '',
          endDate: ''
        });
        this.loadCampaigns();
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Could not create campaign.';
      }
    });
  }

  isApplied(campaign: CampaignItem) {
    return (campaign.applications || []).some((application) =>
      String(application.influencerId) === String(this.user?._id)
    );
  }

  applyToCampaign(campaign: CampaignItem) {
    if (!this.user?._id || !campaign._id) {
      return;
    }

    this.applyingCampaignId = campaign._id;
    this.errorMessage = '';
    this.message = '';

    this.campaignService.applyToCampaign(campaign._id, this.user._id).subscribe({
      next: () => {
        this.applyingCampaignId = '';
        this.message = 'Applied successfully.';
        this.loadCampaigns();
      },
      error: (err) => {
        this.applyingCampaignId = '';
        this.errorMessage = err.error?.message || 'Could not apply to campaign.';
      }
    });
  }

  changeCampaignStatus(campaign: CampaignItem, status: string) {
    if (!campaign._id) {
      return;
    }

    this.campaignService.updateCampaignStatus(campaign._id, status).subscribe({
      next: () => {
        this.loadCampaigns();
      },
      error: () => {
        this.errorMessage = 'Could not update campaign status.';
      }
    });
  }

  daysLeft(endDate?: string) {
    if (!endDate) {
      return 0;
    }

    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const difference = end - now;

    return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
  }

  formatDate(dateValue: string) {
    if (!dateValue) {
      return '';
    }

    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateValue));
  }

  onImageSelected(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.uploadService
      .uploadProfileImage(file)
      .subscribe({

        next: (response: any) => {

          const imageUrl =
            response.fileUrl;

          this.selectedImageUrl = imageUrl;

          this.uploadService
            .saveProfileImage(

              this.user._id,

              imageUrl

            )
            .subscribe({

              next: () => {

                this.message =
                  'Image uploaded successfully';

                this.auth
                  .getProfileDetails()
                  .subscribe({

                    next: (res) => {

                      this.profileDetails =
                        res;

                    }

                  });

              },

              error: () => {

                this.errorMessage =
                  'Could not save image';

              }

            });

        },

        error: () => {

          this.errorMessage =
            'Upload failed';

        }

      });

  }

  onPortfolioSelected(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.uploadingPortfolio = true;

    this.uploadService
      .uploadPortfolioMedia(file)
      .subscribe({

        next: (response: any) => {

          this.uploadService
            .savePortfolio({

              userId:
                this.user._id,

              fileUrl:
                response.fileUrl,

              fileType:
                response.fileType,

              originalName:
                response.originalName

            })
            .subscribe({

              next: () => {

                this.message =
                  'Portfolio uploaded successfully';

                this.uploadingPortfolio =
                  false;

                this.loadPortfolio();

              },

              error: () => {

                this.uploadingPortfolio =
                  false;

                this.errorMessage =
                  'Could not save portfolio';

              }

            });

        },

        error: () => {

          this.uploadingPortfolio =
            false;

          this.errorMessage =
            'Upload failed';

        }

      });

  }

  loadPortfolio() {

    if (!this.user?._id) {
      return;
    }

    this.uploadService
      .getPortfolio(this.user._id)
      .subscribe({

        next: (res: any) => {

          this.portfolioItems = res;

        },

        error: () => {

          console.log(
            'Portfolio load failed'
          );

        }

      });

  }


}
