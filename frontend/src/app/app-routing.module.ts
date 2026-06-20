import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./pages/otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'password',
    loadChildren: () =>
      import('./pages/password/password.module').then((m) => m.PasswordPageModule),
  },
  {
    path: 'profile',
    canActivate: [ProfileGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./pages/portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./pages/campaigns/campaigns.module').then( m => m.CampaignsPageModule)
  },
  {
    path: 'create-campaign',
    loadChildren: () => import('./pages/create-campaign/create-campaign.module').then( m => m.CreateCampaignPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
  path: 'my-profile',
  loadChildren: () =>
    import('./pages/my-profile/my-profile.module')
      .then(m => m.MyProfilePageModule)
},
{
  path: 'portfolio',
  loadChildren: () =>
    import('./pages/portfolio/portfolio.module')
      .then(m => m.PortfolioPageModule)
},
{
  path: 'campaigns',
  loadChildren: () =>
    import('./pages/campaigns/campaigns.module')
      .then(m => m.CampaignsPageModule)
},
{
  path: 'create-campaign',
  loadChildren: () =>
    import('./pages/create-campaign/create-campaign.module')
      .then(m => m.CreateCampaignPageModule)
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}