import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'

import { ActionButton } from '../../interfaces'

@Component({
  selector: 'ngx-toolbar-action',
  template: `
    <ngx-action-button [config]="actionButton" (action)="handleAction($event)"></ngx-action-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarActionComponent {
  @Input() actionButton: ActionButton
  @Output() action = new EventEmitter()

  constructor() {}

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
