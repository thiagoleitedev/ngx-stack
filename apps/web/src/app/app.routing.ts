import { NgModule } from '@angular/core'
import { PreloadAllModules, Routes, RouterModule } from '@angular/router'

import { NgxAdminGuard } from '@ngx-plus/ngx-admin'
import { NgxAuthGuard } from '@ngx-plus/ngx-auth'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: '@ngx-plus/ngx-auth#NgxAuthModule' },
      {
        path: 'dashboard',
        loadChildren: '@ngx-plus/ngx-dashboard#NgxDashboardModule',
        canLoad: [NgxAuthGuard],
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canLoad: [NgxAuthGuard],
      },
      {
        path: 'admin',
        loadChildren: '@ngx-plus/ngx-admin#NgxAdminModule',
        canLoad: [NgxAdminGuard],
      },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
