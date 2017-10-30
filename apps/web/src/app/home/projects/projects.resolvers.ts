import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Project, ProjectsService } from './projects.service'

@Injectable()
export class ProjectResolver implements Resolve<Project> {
  constructor(private service: ProjectsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    return this.service.get(route.params['id'])
  }
}
