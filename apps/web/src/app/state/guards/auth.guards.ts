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
import { LoopBackAuth } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private auth: LoopBackAuth) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.isAuthenticated()
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.canActivate(route)
  }

  canLoad(): boolean {
    return this.isAuthenticated()
  }

  isAuthenticated(): boolean {
    if (this.auth.getAccessTokenId() !== null) {
      return true
    }

    this.router.navigate(['/auth'])
    return false
  }
}
