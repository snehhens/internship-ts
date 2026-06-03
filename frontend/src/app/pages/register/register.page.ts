import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';

import {
  RegisterResponse
} from 'src/app/interfaces/auth.interface';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})

export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  showRoleDropdown = false;

  selectedRole = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.registerForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      role: [
        '',
        [
          Validators.required
        ]
      ]

    });

  }

  toggleRoleDropdown() {

    this.showRoleDropdown =
      !this.showRoleDropdown;

  }

  selectRole(role: string) {

    this.selectedRole = role;

    this.registerForm.patchValue({
      role: role.toLowerCase()
    });

    this.showRoleDropdown = false;

  }

  register() {

    if(this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.auth
      .register(this.registerForm.value)
      .subscribe((res: RegisterResponse) => {

        console.log(res);

        localStorage.setItem(
          "email",
          this.registerForm.value.email
        );

        this.router.navigate(['/otp']);

      });

  }

}