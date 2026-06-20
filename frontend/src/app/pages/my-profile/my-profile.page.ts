import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';
import { UploadService } from 'src/app/services/upload.service';

import { ProfileDetailsResponse }
from 'src/app/interfaces/profile.interface';

import { environment }
from 'src/environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false,
})
export class MyProfilePage implements OnInit {

  public readonly serverUrl =
  environment.serverUrl;

  user: any;

  profileDetails: ProfileDetailsResponse | null = null;

  selectedImageUrl = '';

  message = '';

  errorMessage = '';

  constructor(
  private auth: AuthService,
  private uploadService: UploadService,
  private router: Router
) { }

  ngOnInit() {

    this.auth.getProfile().subscribe({

      next: (user: any) => {

        this.user = user;

        this.loadProfile();

      }

    });

  }

  loadProfile() {

    this.auth.getProfileDetails().subscribe({

      next: (res) => {

        this.profileDetails = res;

      },

      error: () => {

        this.errorMessage =
          'Could not load profile';

      }

    });

  }

  onImageSelected(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.uploadService
      .uploadProfileImage(file)
      .subscribe({

        next: (response: any) => {

          const imageUrl =
            response.fileUrl;

          this.selectedImageUrl = imageUrl;

          this.uploadService
            .saveProfileImage(

              this.user._id,

              imageUrl

            )
            .subscribe({

              next: () => {

                this.message =
                  'Image uploaded successfully';

                this.auth
                  .getProfileDetails()
                  .subscribe({

                    next: (res) => {

                      this.profileDetails =
                        res;

                    }

                  });

              },

              error: () => {

                this.errorMessage =
                  'Could not save image';

              }

            });

        },

        error: () => {

          this.errorMessage =
            'Upload failed';

        }

      });

  }

}