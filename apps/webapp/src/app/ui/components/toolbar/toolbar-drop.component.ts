import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-toolbar-drop',
  template: `
    <ngx-drop-button class="float-right"
                     [config]="config || default"
                     (action)="handleAction($event)">
    </ngx-drop-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDropComponent {
  @Input() config
  @Output() action = new EventEmitter()

  public default = {
    class: 'btn btn-outline-success w-150',
    label: null,
    selected: 10,
    options: [
      { key: 10, value: 10 },
      { key: 25, value: 25 },
      { key: 50, value: 50 },
      { key: 100, value: 100 },
    ],
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
