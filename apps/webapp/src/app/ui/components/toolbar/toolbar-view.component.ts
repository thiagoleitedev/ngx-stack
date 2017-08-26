import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { RadioButtons } from '../../interfaces'

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
  @Input() config: RadioButtons
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
