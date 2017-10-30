import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Container, StorageService } from './storage.service'

@Injectable()
export class ContainerResolver implements Resolve<Container> {
  constructor(private service: StorageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    this.service.read({ where: { id: route.params.id }, include: 'files' })
    return this.service.get(route.params['id'])
  }
}
