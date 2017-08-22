import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ngx-toolbar-drop',
  template: `
    <ngx-drop-button [config]="config || default"
                     (action)="handleAction($event)">
    </ngx-drop-button>
  `,
})
export class ToolbarDropComponent {
  @Input() config
  @Output() action = new EventEmitter()

  public default = {
    label: null,
    selected: 10,
    options: [
      { key: 10, value: 10 },
      { key: 25, value: 25 },
      { key: 50, value: 50 },
      { key: 100, value: 100 },
    ],
  }

  constructor() {}

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
