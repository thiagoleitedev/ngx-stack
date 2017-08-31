import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { SharedModule } from '../../shared.module'
import { ProjectReducer } from '../../state'

import { ProjectsService } from './projects.service'
import { ProjectsRoutingModule } from './projects.routing'

import { ProjectDetailComponent } from './containers/project-detail.component'
import { ProjectListComponent } from './containers/project-list.component'
import { ProjectFormComponent } from './components/project-form.component'

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    StoreModule.forFeature('projects', ProjectReducer),

  ],
  declarations: [
    ProjectDetailComponent,
    ProjectListComponent,
    ProjectFormComponent,
  ],
  providers: [ProjectsService],

})
export class ProjectsModule { }
