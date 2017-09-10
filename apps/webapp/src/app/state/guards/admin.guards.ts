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
import { LoopBackAuth, AccountApi, Role } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/map'

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  private auth$: Observable<any>
  private userRoles$: Observable<any>
  private isAdmin$: Observable<boolean>
  private roles

  constructor(
    private auth: LoopBackAuth,
    private router: Router,
    private store: Store<any>,
    private api: AccountApi,
  ) {
    this.auth$ = this.store.select('auth')
    this.userRoles$ = this.auth$.map(auth => auth.user.roles)
    this.isAdmin$ = this.userRoles$
      .map(roles => roles.map(role => role.name))
      .do(roles => console.log(roles))
      .map(roles => roles.indexOf('Admin') > -1)
      .do(roles => console.log(roles))
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.isAdmin()
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canActivate(route, state)
  }

  canLoad(): Observable<boolean> {
    return this.isAdmin()
  }

  isAdmin(): Observable<boolean> {
    return this.isAdmin$
  }
}
