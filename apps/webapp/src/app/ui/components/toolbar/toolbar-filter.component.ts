import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-toolbar-filter',
  template: `
    <div class="input-group">
      <input type="text"
             class="form-control is-valid"
             placeholder="filter"
             [(ngModel)]="filter"
             (keyup)="action.emit({ type: 'Filter', payload: filter })">
      <span class="input-group-btn">
        <button class="btn btn-success text-white"
                type="button"
                (click)="action.emit({ type: 'Filter', payload: filter })">
          <i class="fa fa-fw fa-filter"></i>
        </button>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarFilterComponent {
  @Output() action = new EventEmitter()

  public filter: string

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
