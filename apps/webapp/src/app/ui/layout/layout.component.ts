import { Component } from '@angular/core'
import { NgxUiService } from '../services/index'

@Component({
  selector: 'ngx-layout',
  template: `
    <ngx-header></ngx-header>
    <ngx-sidebar></ngx-sidebar>
    <ngx-body></ngx-body>
    <ngx-footer></ngx-footer>
  `,
})
export class LayoutComponent {

  constructor(public ui: NgxUiService) { }

}
