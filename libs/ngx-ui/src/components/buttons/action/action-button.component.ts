import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { NgxActionButton } from '../../../interfaces'

@Component({
  selector: 'ngx-action-button',
  template: `
    <button *ngIf="config"
            [class]="config.class || ''"
            (click)="handleAction({ type: config.action, payload: config.item || '' })">
        <i *ngIf="config.icon"
           [class]="config.icon">
        </i>
        {{ config.label }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
  @Input() config: NgxActionButton
  @Output() action = new EventEmitter()

  public search: string

  handleAction(event) {
    switch (event.type) {
      default:
        return this.action.emit(event)
    }
  }
}
