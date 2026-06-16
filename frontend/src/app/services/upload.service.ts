import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  uploadProfileImage(
    file: File
  ) {

    const formData =
      new FormData();

    formData.append(
      'profileImage',
      file
    );

    return this.http.post(

      `${this.apiUrl}/upload/profile-image`,

      formData

    );

  }

  saveProfileImage(
    userId: string,
    imageUrl: string
  ) {

    return this.http.put(

      `${this.apiUrl}/profile/image`,

      {
        userId,
        imageUrl
      }

    );

  }

  uploadPortfolioMedia(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    'portfolioMedia',
    file
  );

  return this.http.post(

    `${this.apiUrl}/upload/portfolio-media`,

    formData

  );

}

savePortfolio(
  data: any
) {

  return this.http.post(

    `${this.apiUrl}/upload/save-portfolio`,

    data

  );

}

getPortfolio(
  userId: string
) {

  return this.http.get(

    `${this.apiUrl}/upload/portfolio/${userId}`

  );

}

}

