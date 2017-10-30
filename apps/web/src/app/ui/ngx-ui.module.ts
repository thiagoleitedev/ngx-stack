import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts'
import { NgxFormsModule } from '@ngx-plus/ngx-forms'
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading'
import { NgUploaderModule } from 'ngx-uploader'

import {
  ActionButtonComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeaderBrandComponent,
  CardHeaderTabsComponent,
  CardHeaderTitleComponent,
  DashCardComponent,
  DropButtonComponent,
  FileUploaderComponent,
  FileUploaderListComponent,
  ModalComponent,
  RadioButtonsComponent,
  ToolbarComponent,
  ToolbarActionComponent,
  ToolbarDropComponent,
  ToolbarFilterComponent,
  ToolbarViewComponent,
  TableComponent,
  TableFooterComponent,
} from './components/index'
import { GridComponent } from './containers/index'
import {
  LayoutComponent,
  BodyComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
} from './layout/index'

import { NgxUiService } from './services'

const components = [
  ActionButtonComponent,
  DropButtonComponent,
  RadioButtonsComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeaderBrandComponent,
  CardHeaderTabsComponent,
  CardHeaderTitleComponent,
  DashCardComponent,
  FileUploaderComponent,
  FileUploaderListComponent,
  ModalComponent,
  TableComponent,
  TableFooterComponent,
  ToolbarComponent,
  ToolbarActionComponent,
  ToolbarDropComponent,
  ToolbarFilterComponent,
  ToolbarViewComponent,
  GridComponent,
  LayoutComponent,
  BodyComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
]

const modules = [
  LoadingModule,
  Ng2BreadcrumbModule,
  NgbModule,
  NgUploaderModule,
  NgxAlertsModule,
  NgxDatatableModule,
  NgxFormsModule,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    Ng2BreadcrumbModule.forRoot(),
    NgbModule.forRoot(),
    NgUploaderModule,
    NgxAlertsModule.forRoot(),
    NgxDatatableModule,
    NgxFormsModule.forRoot(),
  ],
  declarations: [...components],
  entryComponents: [ModalComponent],
  exports: [...components, ...modules],
})
export class NgxUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxUiModule,
      providers: [NgxUiService],
    }
  }
}
