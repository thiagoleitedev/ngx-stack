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
import { Observable } from 'rxjs/Observable'
import { map, take, tap } from 'rxjs/operators'

import { LoopBackAuth } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'

@Injectable()
export class NgxAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auth: LoopBackAuth,
    private router: Router,
    private store: Store<any>,
    private ui: NgxUiService
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
    return this.store.select('auth').pipe(
      map(auth => auth.isAdmin),
      take(1),
      tap(admin => {
        if (!admin) {
          this.ui.alerts.notifyError({
            title: 'Not Authorized',
            body: 'Only Admin users can view the Admin section!',
          })
        }
      })
    )
  }
}
