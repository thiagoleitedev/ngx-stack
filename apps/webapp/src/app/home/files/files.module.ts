import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'

import { FilesService } from './files.service'
import { FilesRoutingModule } from './files.routing'

import { FileDetailComponent } from './containers/file-detail.component'
import { FileListComponent } from './containers/file-list.component'
import { FileFormComponent } from './components/file-form.component'
import { FileViewComponent } from './components/file-view.component'

@NgModule({
  imports: [
    SharedModule,
    FilesRoutingModule,
  ],
  declarations: [
    FileDetailComponent,
    FileListComponent,
    FileFormComponent,
    FileViewComponent,
  ],
  providers: [FilesService],

})
export class FilesModule { }
