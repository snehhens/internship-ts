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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  loading = false;

  errorMessage = '';

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    this.auth
      .login(this.loginForm.value)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          localStorage.setItem(
            'token',
            res.token
          );

          localStorage.setItem(
            'role',
            res.role
          );

          localStorage.setItem(
            'profileCompleted',
            res.profileCompleted
          );


          this.loading = false;

          if (res.profileCompleted) {

            this.router.navigate(['/home']);

          } else {

            this.router.navigate(['/profile']);

          }

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =
            err.error.message ||
            'Invalid credentials';

        }

      });

  }

}