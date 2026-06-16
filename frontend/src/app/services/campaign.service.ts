import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CampaignPayload } from '../interfaces/campaign.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  apiUrl =
    `${environment.apiUrl}/campaign`;

  constructor(
    private http: HttpClient
  ) {}

  getCampaigns() {

    return this.http.get(
      this.apiUrl
    );

  }

  getBrandCampaigns(brandId: string) {
    return this.http.get(
      `${this.apiUrl}/brand/${brandId}`
    );
  }

  applyToCampaign(campaignId: string, influencerId: string) {
    return this.http.post(
      `${this.apiUrl}/apply`,
      {
        campaignId,
        influencerId
      }
    );
  }

  updateCampaignStatus(campaignId: string, status: string) {
    return this.http.patch(
      `${this.apiUrl}/${campaignId}/status`,
      { status }
    );
  }

  createCampaign(data: CampaignPayload) {
    return this.http.post(
      `${this.apiUrl}/create`,
      data
    );
  }

}
