import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxFormsModule } from '@ngx-plus/ngx-forms'
import { ToastyModule } from 'ng2-toasty'
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import {
  LayoutComponent, BodyComponent, FooterComponent,
  HeaderComponent, SidebarComponent
} from './layout/index'
import {
  CardComponent, CardHeaderComponent,
  CardHeaderBrandComponent, CardHeaderTabsComponent, CardHeaderTitleComponent,
  ModalComponent, DashCardComponent, ToolbarComponent, TableComponent
} from './components/index'
import { GridComponent } from './containers/index'

import { NgxUiService } from './services/ngx-ui'

const components = [
  LayoutComponent,
  BodyComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeaderBrandComponent,
  CardHeaderTabsComponent,
  CardHeaderTitleComponent,
  ModalComponent,
  DashCardComponent,
  TableComponent,
  // ToolbarComponent,
  GridComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    NgxFormsModule.forRoot(),
    ToastyModule.forRoot(),
    Ng2BreadcrumbModule.forRoot(),
    NgxDatatableModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
    ...components,
    NgxFormsModule,
    NgbModule,
    ToastyModule,
    Ng2BreadcrumbModule,
    NgxDatatableModule,
  ]
})
export class NgxUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxUiModule,
      providers: [
        NgxUiService,
      ]
    }
  }
}
