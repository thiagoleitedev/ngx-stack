import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() user: any
  @Output() action = new EventEmitter()

  constructor(
    public ui: NgxUiService,
    private router: Router,
  ) { }

  logout() {
    this.action.emit({ type: 'LogOut' })
  }

}
