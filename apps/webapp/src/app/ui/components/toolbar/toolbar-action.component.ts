import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-toolbar-action',
  template: `
    <ngx-action-button [config]="actionButton"></ngx-action-button>
  `,
})
export class ToolbarActionComponent {
  @Input()
  actionButton = {
    action: 'Create',
    class: 'btn btn-outline-primary btn-block',
    label: 'Create',
    icon: 'fa fa-fw fa-plus',
  }
  @Output() action = new EventEmitter()

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
