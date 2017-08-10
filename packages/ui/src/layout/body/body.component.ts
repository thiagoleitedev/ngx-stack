import { Component } from '@angular/core'
import { NgxUiService } from '../../services/ngx-ui'
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb'

@Component({
  selector: 'ngx-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  constructor(
    public ui: NgxUiService,
    public breadcrumbService: BreadcrumbService
  ) { }
}
