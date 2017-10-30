import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { LoopBackAuth } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

import { NgxUiService } from '../../ui'

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auth: LoopBackAuth,
    private router: Router,
    private store: Store<any>,
    private ui: NgxUiService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isAdmin()
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(route)
  }

  canLoad(route: Route): Observable<boolean> {
    return this.isAdmin()
  }

  isAdmin(): Observable<boolean> {
    return this.store
      .select('auth')
      .map(auth => auth.isAdmin)
      .take(1)
      .do(admin => {
        if (!admin) {
          this.ui.alerts.notifyError({
            title: 'Not Authorized',
            body: 'Only Admin users can view the Admin section!',
          })
        }
      })
  }
}
