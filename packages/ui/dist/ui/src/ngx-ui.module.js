var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFormsModule } from '@ngx-plus/ngx-forms';
import { ToastyModule } from 'ng2-toasty';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LayoutComponent, BodyComponent, FooterComponent, HeaderComponent, SidebarComponent } from './layout/index';
import { CardComponent, CardHeaderComponent, CardHeaderBrandComponent, CardHeaderTabsComponent, CardHeaderTitleComponent, ModalComponent, DashCardComponent, ToolbarComponent, TableComponent } from './components/index';
import { GridComponent } from './containers/index';
import { NgxUiService } from './services/index';
var components = [
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
    ToolbarComponent,
    GridComponent
];
var NgxUiModule = NgxUiModule_1 = (function () {
    function NgxUiModule() {
    }
    NgxUiModule.forRoot = function () {
        return {
            ngModule: NgxUiModule_1,
            providers: [
                NgxUiService,
            ]
        };
    };
    return NgxUiModule;
}());
NgxUiModule = NgxUiModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule,
            NgbModule.forRoot(),
            NgxFormsModule.forRoot(),
            ToastyModule.forRoot(),
            Ng2BreadcrumbModule.forRoot(),
            NgxDatatableModule,
        ],
        declarations: components.slice(),
        entryComponents: [
            ModalComponent
        ],
        exports: components.concat([
            NgxFormsModule,
            NgbModule,
            ToastyModule,
            Ng2BreadcrumbModule,
            NgxDatatableModule,
        ])
    })
], NgxUiModule);
export { NgxUiModule };
var NgxUiModule_1;
//# sourceMappingURL=ngx-ui.module.js.map