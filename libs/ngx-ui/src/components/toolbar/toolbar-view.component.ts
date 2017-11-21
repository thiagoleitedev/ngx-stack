import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { NgxRadioButtons } from '../../interfaces'

@Component({
  selector: 'ngx-toolbar-view',
  template: `
    <ngx-radio-buttons [config]="config"
                       (action)="handleAction($event)">
    </ngx-radio-buttons>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarViewComponent {
  @Input() config: NgxRadioButtons
  @Output() action = new EventEmitter()

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
