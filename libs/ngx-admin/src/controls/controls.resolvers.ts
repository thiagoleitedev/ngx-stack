import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Control, ControlsService } from './controls.service'

@Injectable()
export class ControlResolver implements Resolve<Control> {
  constructor(private service: ControlsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Control> {
    return this.service.get(route.params['id'])
  }
}
