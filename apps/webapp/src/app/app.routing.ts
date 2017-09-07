import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: true,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
