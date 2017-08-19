import { Component } from '@angular/core'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    public ui: NgxUiService
  ) { }

}
