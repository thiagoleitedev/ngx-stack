import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() title
  @Input() formConfig
  @Input() item
  @Input() uploader = false
  @Output() action = new EventEmitter()

  handleAction($event) {
    switch ($event.type) {
      default:
        return this.action.emit($event)
    }
  }
}
