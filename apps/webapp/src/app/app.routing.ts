import { NgModule } from '@angular/core'
import { PreloadAllModules, Routes, RouterModule } from '@angular/router'
import { AdminGuard, AuthGuard } from './state'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard],
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canLoad: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [AdminGuard],
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
