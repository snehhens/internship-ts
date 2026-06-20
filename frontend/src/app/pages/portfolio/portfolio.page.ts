import { Component, OnInit } from '@angular/core';

import { AuthService }
from 'src/app/services/auth';

import { UploadService }
from 'src/app/services/upload.service';

import { environment }
from 'src/environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
  standalone: false,
})
export class PortfolioPage implements OnInit {

  public readonly serverUrl =
    environment.serverUrl;

  user: any;

  portfolioItems: any[] = [];

  uploading = false;

  message = '';

  errorMessage = '';

  constructor(

    private auth: AuthService,

    private uploadService: UploadService

  ) { }

  ngOnInit() {

    this.auth.getProfile().subscribe({

      next: (user: any) => {

        this.user = user;

        this.loadPortfolio();

      }

    });

  }

  loadPortfolio() {

    if (!this.user?._id) {
      return;
    }

    this.uploadService
      .getPortfolio(this.user._id)
      .subscribe({

        next: (res: any) => {

          this.portfolioItems = res;

        },

        error: () => {

          this.errorMessage =
            'Could not load portfolio';

        }

      });

  }

  onPortfolioSelected(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.uploading = true;

    this.uploadService
      .uploadPortfolioMedia(file)
      .subscribe({

        next: (response: any) => {

          this.uploadService
            .savePortfolio({

              userId:
                this.user._id,

              fileUrl:
                response.fileUrl,

              fileType:
                response.fileType,

              originalName:
                response.originalName

            })
            .subscribe({

              next: () => {

                this.uploading = false;

                this.message =
                  'Portfolio uploaded';

                this.loadPortfolio();

              },

              error: () => {

                this.uploading = false;

                this.errorMessage =
                  'Could not save portfolio';

              }

            });

        },

        error: () => {

          this.uploading = false;

          this.errorMessage =
            'Upload failed';

        }

      });

  }

}