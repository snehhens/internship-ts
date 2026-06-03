import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
from 'src/app/services/auth';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: false,
})

export class PasswordPage implements OnInit {

  passwordForm!: FormGroup;

  loading = false;

  errorMessage = '';

  showPassword = false;

  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const savedEmail =
      localStorage.getItem('email');

    this.passwordForm = this.fb.group({

      email: [
        savedEmail || ''
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]

    }, {
      validators: this.passwordMatchValidator
    });

  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password =
      form.get('password')?.value;

    const confirmPassword =
      form.get('confirmPassword')?.value;

    if(password !== confirmPassword) {

      return {
        passwordMismatch: true
      };

    }

    return null;

  }

  createPassword() {

    if(this.passwordForm.invalid) {

      this.passwordForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    const payload = {

      email:
        this.passwordForm.value.email,

      password:
        this.passwordForm.value.password

    };

    this.auth
      .createPassword(payload)
      .subscribe({

        next: (res:any) => {

          console.log(res);

          this.loading = false;

          this.router.navigate(['/login']);

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =
            err.error.message ||
            'Something went wrong';

        }

      });

  }

}