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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {

  profileForm!: FormGroup;

  role = '';

  loading = false;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    const savedEmail =
      localStorage.getItem('email');

    this.role =
      localStorage.getItem('role') || '';

    console.log(
      'Current Role:',
      this.role
    );

    this.profileForm = this.fb.group({

      email: [
        savedEmail || ''
      ],

      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[0-9]{10}$'
          )
        ]
      ],

      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      bio: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],

      instagram: [
        '',
        [
          Validators.required
        ]
      ],

      instagramFollowers: [''],

      youtube: [''],

      youtubeFollowers: [''],

      twitter: [''],

      twitterFollowers: [''],

      country: [''],

      category: [''],

      website: [''],

      industry: [''],

      budgetMin: [''],
      budgetMax: [''],

      brandDescription: [''],

      firstName: [''],

      lastName: [''],


    });

  }

  saveProfile() {

  


    this.loading = true;

    this.errorMessage = '';

    this.auth
      .completeProfile(
        this.profileForm.value
      )
      .subscribe({

        next: (res: any) => {

          console.log(res);

          localStorage.setItem(
            'profileCompleted',
            'true'
          );

          this.loading = false;

          this.router.navigate(['/home']);

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
