import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() title
  @Input() formConfig
  @Input() item
  @Output() action = new EventEmitter()

  constructor() {}

  handleAction($event) {
    switch ($event.type) {
      default:
        return this.action.emit($event)
    }
  }

  ngOnInit() {}
}
