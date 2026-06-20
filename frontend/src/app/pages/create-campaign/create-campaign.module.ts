import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampaignPageRoutingModule } from './create-campaign-routing.module';

import { CreateCampaignPage } from './create-campaign.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

  imports: [

    CommonModule,

    FormsModule,

    ReactiveFormsModule,

    IonicModule,

    CreateCampaignPageRoutingModule

  ],

  declarations: [
    CreateCampaignPage
  ]

})
export class CreateCampaignPageModule {}
