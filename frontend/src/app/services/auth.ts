import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegisterData,
  VerifyOtpData,
  PasswordData,
  LoginData
} from '../interfaces/auth.interface';

import { ProfileDetailsResponse } from '../interfaces/profile.interface';
import { environment } from 'src/environments/environment';

import {
  RegisterResponse,
  AuthResponse,
  LoginResponse
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(data: RegisterData) {
    return this.http.post<RegisterResponse>(
      `${this.api}/register`,
      data
    );
  }

  verifyOtp(data: VerifyOtpData) {
    return this.http.post<AuthResponse>(
      `${this.api}/verify-otp`,
      data
    );
  }

  resendOtp(email: string) {

    return this.http.post(
      `${this.api}/resend-otp`,
      { email }
    );

  }

  createPassword(data: PasswordData) {
    return this.http.post<AuthResponse>(
      `${this.api}/create-password`,
      data
    );
  }

  login(data: LoginData) {
    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      data
    );
  }

  getProfile() {

    const token =
      localStorage.getItem("token");

    const headers = {
      Authorization: token || ''
    };

    return this.http.get(
      `${this.api}/profile`,
      { headers }
    );

  }

  getProfileDetails() {

    const token = localStorage.getItem('token');

    return this.http.get<ProfileDetailsResponse>(
      `${environment.apiUrl}/profile/details`,
      {
        headers: {
          Authorization: token || ''
        }
      }
    );

  }

  completeProfile(data: any) {

    return this.http.post(

      `${environment.apiUrl}/profile/complete-profile`,

      data

    );

  }
}




