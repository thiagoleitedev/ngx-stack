import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { ActionButton } from '../../../interfaces'

@Component({
  selector: 'ngx-action-button',
  template: `
    <button *ngIf="config"
            [class]="config.class || ''"
            (click)="handleAction({ type: config.action, payload: config.item || '' })">
        <i [class]="config.icon"></i> {{ config.label }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
  @Input() config: ActionButton
  @Output() action = new EventEmitter()

  public search: string

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
