import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { User, UsersService } from './users.service'

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private service: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.service.get(route.params['id'])
  }
}
