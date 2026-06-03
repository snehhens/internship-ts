import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  apiUrl =
    'http://localhost:5000/api/campaign';

  constructor(
    private http: HttpClient
  ) {}

  getCampaigns() {

    return this.http.get(
      this.apiUrl
    );

  }

}