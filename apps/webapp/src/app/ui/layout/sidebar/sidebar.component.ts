import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() config

  constructor(public ui: NgxUiService) {}
}
