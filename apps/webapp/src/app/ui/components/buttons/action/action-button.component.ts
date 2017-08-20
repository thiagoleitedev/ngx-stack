import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ActionButton } from '../../../interfaces'

@Component({
  selector: 'ngx-action-button',
  template: `
  <div *ngIf="config">
    <button [class]="config.class || ''"
            (click)="handleAction({ type: config.action, payload: config.item || '' })">
        <i [class]="config.icon"></i> {{ config.label }}
    </button>
  </div>
  `,
})
export class ActionButtonComponent {
  @Input() config: ActionButton
  @Input() item: any
  @Output() action = new EventEmitter()

  public search: string

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
