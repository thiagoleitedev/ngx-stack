import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'

import { StorageService } from './storage.service'
import { StorageRoutingModule } from './storage.routing'

import { ContainerListComponent } from './containers/container-list.component'
import { ContainerDetailComponent } from './containers/container-detail.component'
import { FileListComponent } from './components/file-list.component'
import { FileFormComponent } from './components/file-form.component'

@NgModule({
  imports: [SharedModule, StorageRoutingModule],
  declarations: [
    ContainerDetailComponent,
    ContainerListComponent,
    FileFormComponent,
    FileListComponent,
  ],
  providers: [StorageService],
})
export class StorageModule {}
