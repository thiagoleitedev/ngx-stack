import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ngx-drop-button',
  template: `
    <div ngbDropdown
         class="d-inline-block float-right">
      <button ngbDropdownToggle
              [class]="'dropdown-toggle ' + (config.class || default.class)"
              id="ngxDropButton">{{ config.label || config.selected }}
      </button>
      <div ngbDropdownMenu
           class="dropdown-menu-right"
           aria-labelledby="ngxDropButton">
        <button *ngFor="let option of config.options"
                class="dropdown-item"
                (click)="action.emit({ type: 'DropSelection', payload: option }); config.selected = option.value"
                [class.active]="config.selected === option.value"> {{ option.key }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .dropdown-toggle {
      min-width: 150px;
    }

    .dropdown-menu-right {
      min-width: 150px;
      top: 0;
    }

    .dropdown-item {
      text-align: center;
    }
  `,
  ],
})
export class DropButtonComponent {
  @Input() config
  @Output() action = new EventEmitter()

  public default = {
    class: 'btn btn-outline-success',
    label: null,
    options: [
      { key: 10, value: 10 },
      { key: 25, value: 25 },
      { key: 50, value: 50 },
      { key: 100, value: 100 },
    ],
    selected: 10,
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
