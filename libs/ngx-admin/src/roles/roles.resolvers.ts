import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Role, RolesService } from './roles.service'

@Injectable()
export class RoleResolver implements Resolve<Role> {
  constructor(private service: RolesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Role> {
    return this.service.get(route.params['id'])
  }
}
