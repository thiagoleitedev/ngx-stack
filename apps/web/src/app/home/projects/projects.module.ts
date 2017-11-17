import { NgModule } from '@angular/core'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { ProjectsService } from './projects.service'
import { ProjectsRoutingModule } from './projects.routing'
import { ProjectDetailComponent } from './containers/project-detail.component'
import { ProjectListComponent } from './containers/project-list.component'
import { ProjectFormComponent } from './components/project-form.component'

@NgModule({
  imports: [NgxSharedModule, ProjectsRoutingModule],
  declarations: [ProjectDetailComponent, ProjectListComponent, ProjectFormComponent],
  providers: [ProjectsService],
})
export class ProjectsModule {}
