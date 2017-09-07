import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Container, FilesService } from './files.service'

@Injectable()
export class FileResolver implements Resolve<Container> {
  constructor(private service: FilesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return this.service.getFiles(route.params['id'])
  }
}
