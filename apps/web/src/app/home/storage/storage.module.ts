import { NgModule } from '@angular/core'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { StorageService } from './storage.service'
import { StorageRoutingModule } from './storage.routing'
import { ContainerListComponent } from './containers/container-list.component'
import { ContainerDetailComponent } from './containers/container-detail.component'
import { FileListComponent } from './components/file-list.component'
import { FileFormComponent } from './components/file-form.component'

@NgModule({
  imports: [NgxSharedModule, StorageRoutingModule],
  declarations: [ContainerDetailComponent, ContainerListComponent, FileFormComponent, FileListComponent],
  providers: [StorageService],
})
export class StorageModule {}
