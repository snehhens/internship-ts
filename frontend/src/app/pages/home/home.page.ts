import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  user: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

    this.auth.getProfile().subscribe({

      next: (res: any) => {

        this.user = res;

      },

      error: () => {

        this.router.navigate(
          ['/login']
        );

      }

    });

  }

  logout() {

    localStorage.clear();

    this.user = null;

    this.router.navigateByUrl(
      '/login',
      {
        replaceUrl: true
      }
    );

  }

}