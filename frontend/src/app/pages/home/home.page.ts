import { Component, OnInit } from '@angular/core';
import { AuthService }
  from 'src/app/services/auth';
import { Router } from '@angular/router';  

 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  user: any;

  constructor(private auth: AuthService, private router: Router) { }

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  ngOnInit() {

    this.auth.getProfile()
      .subscribe((res: any) => {

        console.log(res);

        this.user = res;

      });

  }

}