import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';
import { CampaignService } from 'src/app/services/campaign.service';

import {
  CampaignItem
} from 'src/app/interfaces/campaign.interface';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
  standalone: false,
})
export class CampaignsPage implements OnInit {

  user: any;

  campaigns: CampaignItem[] = [];

  loading = false;

  applyingCampaignId = '';

  message = '';

  errorMessage = '';

  constructor(
    private auth: AuthService,
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {

    this.loadUser();

  }

  ionViewWillEnter() {

    this.loadUser();

  }

  loadUser() {

    this.auth.getProfile().subscribe({

      next: (res: any) => {

        this.user = res;

        this.loadCampaigns();

      },

      error: () => {

        this.router.navigate(['/login']);

      }

    });

  }

  loadCampaigns() {

    this.loading = true;

    const request =
      this.user?.role === 'brand'
        ? this.campaignService.getBrandCampaigns(
            this.user._id
          )
        : this.campaignService.getCampaigns();

    request.subscribe({

      next: (res: any) => {

        const items =
          Array.isArray(res)
            ? res
            : [];

        this.campaigns =
          this.user?.role === 'brand'
            ? items
            : items.filter(
                (campaign: CampaignItem) =>
                  campaign.status === 'active'
              );

        this.loading = false;

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Could not load campaigns';

      }

    });

  }

  isApplied(
    campaign: CampaignItem
  ) {

    return (
      campaign.applications || []
    ).some(

      (application) =>

        String(
          application.influencerId
        ) ===

        String(
          this.user?._id
        )

    );

  }

  applyToCampaign(
    campaign: CampaignItem
  ) {

    if (
      !this.user?._id ||
      !campaign._id
    ) {
      return;
    }

    this.applyingCampaignId =
      campaign._id;

    this.campaignService
      .applyToCampaign(

        campaign._id,

        this.user._id

      )
      .subscribe({

        next: () => {

          this.message =
            'Applied Successfully';

          this.applyingCampaignId =
            '';

          this.loadCampaigns();

        },

        error: (err) => {

          this.errorMessage =
            err.error?.message ||
            'Could not apply';

          this.applyingCampaignId =
            '';

        }

      });

  }

  changeCampaignStatus(
    campaign: CampaignItem,
    status: string
  ) {

    if (!campaign._id) {
      return;
    }

    this.campaignService
      .updateCampaignStatus(

        campaign._id,

        status

      )
      .subscribe({

        next: () => {

          this.loadCampaigns();

        },

        error: () => {

          this.errorMessage =
            'Could not update status';

        }

      });

  }

  daysLeft(
    endDate?: string
  ) {

    if (!endDate) {
      return 0;
    }

    const end =
      new Date(endDate).getTime();

    const now =
      new Date().getTime();

    const difference =
      end - now;

    return Math.max(

      0,

      Math.ceil(
        difference /
        (
          1000 *
          60 *
          60 *
          24
        )
      )

    );

  }

}