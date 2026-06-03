import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
from 'src/app/services/auth';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: false,
})

export class OtpPage implements OnInit {

  otpForm!: FormGroup;

  loading = false;

  errorMessage = '';

  timer = 30;

  resendDisabled = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const savedEmail =
      localStorage.getItem('email');

    this.otpForm = this.fb.group({

      email: [
        savedEmail || ''
      ],

      otp: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]

    });

    this.startTimer();

  }

  verifyOtp() {

    if(this.otpForm.invalid) {

      this.otpForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    this.auth
      .verifyOtp(this.otpForm.value)
      .subscribe({

        next: (res:any) => {

          console.log(res);

          this.loading = false;

          this.router.navigate(['/password']);

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =
            err.error.message || 'Invalid OTP';

        }

      });

  }

  resendOtp() {

    if(this.resendDisabled) return;

    const email =
      this.otpForm.value.email;

    this.auth
      .resendOtp(email)
      .subscribe({

        next: (res:any) => {

          console.log(res);

          this.startTimer();

        }

      });

  }

  startTimer() {

    this.timer = 30;

    this.resendDisabled = true;

    const interval = setInterval(() => {

      this.timer--;

      if(this.timer <= 0) {

        clearInterval(interval);

        this.resendDisabled = false;

      }

    }, 1000);

  }

}