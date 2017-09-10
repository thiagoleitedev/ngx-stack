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

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auth: LoopBackAuth,
    private router: Router,
    private store: Store<any>,
  ) {}

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

  canLoad(route: Route): Observable<boolean> {
    return this.isAdmin()
  }

  isAdmin(): Observable<boolean> {
    return this.store.select('auth').map(auth => auth.isAdmin).take(1)
  }
}
