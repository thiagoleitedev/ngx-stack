import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'

@Component({
  selector: 'ngx-toolbar-filter',
  template: `
    <div class="input-group">
      <input type="text"
             [class]="filterClass"
             placeholder="filter"
             [(ngModel)]="filter"
             (blur)="filterClass = 'form-control'"
             (focus)="filterClass = 'form-control is-valid'"
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
  public filterClass: string = 'form-control'

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
