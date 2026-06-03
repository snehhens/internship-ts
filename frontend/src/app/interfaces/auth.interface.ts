export interface RegisterData {
  email: string;
  role: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface PasswordData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
  otp: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  profileCompleted: boolean;
}