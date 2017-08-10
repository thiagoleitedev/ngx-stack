import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  @Input() title
  @Input() formConfig
  @Input() item
  @Output() action = new EventEmitter()

  constructor(
    public ui: NgxUiService,
  ) { }

  handleAction($event) {
    switch ($event.type) {
      default:
        return this.action.emit($event)
    }
  }

  ngOnInit() { }
}
