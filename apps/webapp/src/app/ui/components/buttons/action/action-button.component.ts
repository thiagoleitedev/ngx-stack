import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NgxUiService } from '../../../services'

@Component({
  selector: 'ngx-action-button',
  template: `
  <div *ngIf="config">
    <button [class]="config.class || ''"
            (click)="action.emit($event)">
        <i [class]="config.icon"></i> {{ config.label }}
    </button>
  </div>
  `,
})
export class ActionButtonComponent {
  @Input()
  config = {
    class: 'btn btn-primary',
    label: 'Create',
    icon: 'fa fa-fw fa',
  }
  @Output() action = new EventEmitter()

  public search: string

  constructor() {}

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
