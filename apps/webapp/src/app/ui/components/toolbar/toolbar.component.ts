import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'

import { ToolbarConfig } from '../../interfaces'

@Component({
  selector: 'ngx-toolbar',
  template: `
  <div class="row align-items-center justify-content-center toolbar-wrapper">
    <div class="col-md-4 col-lg-3">
      <ngx-toolbar-view [config]="config.radioButtons || default.radioButtons"
                        (action)="handleAction($event)">
      </ngx-toolbar-view>
    </div>
    <div class="col-md-4 col-lg-6">
      <ngx-toolbar-action *ngIf="config.actionButton"
                          [actionButton]="config.actionButton"
                          (action)="handleAction($event)">
      </ngx-toolbar-action>
      <ngx-toolbar-filter *ngIf="config.filter" (action)="action.emit($event)"></ngx-toolbar-filter>
    </div>
    <div class="col-md-4 col-lg-3">
      <ngx-toolbar-drop (action)="handleAction($event)"></ngx-toolbar-drop>
    </div>
  </div>
  `,
  styles: [
    `
    .toolbar-wrapper {
      background: #f9f9f9;
      margin-top: -20px;
      padding   : 20px 0;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() config: ToolbarConfig
  @Output() action = new EventEmitter()

  public default: ToolbarConfig = {
    radioButtons: {
      options: [
        {
          value: 'table',
          icon: 'fa fa-fw fa-table',
        },
        {
          value: 'cards',
          icon: 'fa fa-fw fa-th-large',
        },
      ],
      selected: 'table',
    },
  }

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
