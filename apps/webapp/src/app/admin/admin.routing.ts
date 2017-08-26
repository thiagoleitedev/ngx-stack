import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'roles', loadChildren: './roles/roles.module#RolesModule' },
      {
        path: 'controls',
        loadChildren: './controls/controls.module#ControlsModule',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
