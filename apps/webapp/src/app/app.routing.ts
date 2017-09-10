import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminGuard, AuthGuard } from './state'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
