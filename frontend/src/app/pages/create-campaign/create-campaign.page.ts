import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
from 'src/app/services/auth';

import { CampaignService }
from 'src/app/services/campaign.service';

import {
  CampaignPayload
} from 'src/app/interfaces/campaign.interface';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.page.html',
  styleUrls: ['./create-campaign.page.scss'],
  standalone: false,
})
export class CreateCampaignPage implements OnInit {

  user: any;

  campaignForm!: FormGroup;

  saving = false;

  message = '';

  errorMessage = '';

  constructor(

    private fb: FormBuilder,

    private auth: AuthService,

    private campaignService: CampaignService,

    private router: Router

  ) { }

  ngOnInit() {

    this.campaignForm = this.fb.group({

      campaignTitle:
        ['', Validators.required],

      description:
        ['', Validators.required],

      category:
        ['', Validators.required],

      platform:
        ['', Validators.required],

      budgetPerInfluencer:
        [0, Validators.required],

      totalSlots:
        [1, Validators.required],

      startDate:
        ['', Validators.required],

      endDate:
        ['', Validators.required]

    });

  }

  ionViewWillEnter() {

    this.auth.getProfile().subscribe({

      next: (res: any) => {

        this.user = res;

      },

      error: () => {

        this.router.navigate([
          '/login'
        ]);

      }

    });

  }

  createCampaign() {

    if (this.campaignForm.invalid) {

      this.campaignForm.markAllAsTouched();

      return;

    }

    const formValue =
      this.campaignForm.value;

    const payload:
      CampaignPayload = {

      ...formValue,

      budgetPerInfluencer:
        Number(
          formValue.budgetPerInfluencer
        ),

      totalSlots:
        Number(
          formValue.totalSlots
        ),

      brandId:
        this.user._id,

      brandName:
        this.user.username ||
        this.user.email

    };

    this.saving = true;

    this.campaignService
      .createCampaign(payload)
      .subscribe({

        next: () => {

          this.saving = false;

          this.message =
            'Campaign created successfully';

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

        },

        error: () => {

          this.saving = false;

          this.errorMessage =
            'Could not create campaign';

        }

      });

  }

}