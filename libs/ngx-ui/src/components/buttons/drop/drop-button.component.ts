import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { DropButton } from '../../../interfaces'

@Component({
  selector: 'ngx-drop-button',
  template: `
    <div ngbDropdown
         class="d-inline-block">
      <button ngbDropdownToggle
              [class]="'dropdown-toggle ' + (config.class || default.class)"
              id="ngxDropButton">
        <i *ngIf="config.icon" [class]="config.icon"></i>
        {{ config.label || config.selected }}
      </button>
      <div ngbDropdownMenu
           class="dropdown-menu-right"
           aria-labelledby="ngxDropButton">
        <button *ngFor="let option of config.options"
                class="dropdown-item"
                (click)="action.emit({ type: (config.action || 'DropSelection'), payload: option }); config.selected = option.key"
                [class.active]="config.selected === option.key"> {{ option.key }}
        </button>
        <p *ngIf="!config.options">
          {{ config.emptyMessage || default.emptyMessage }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
    .dropdown-menu-right {
      left: auto;
      right: 0;
      top: 0;
    }

    .dropdown-item {
      text-align: center;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropButtonComponent {
  @Input() config: DropButton
  @Output() action = new EventEmitter()

  public default = {
    class: 'btn btn-outline-success',
    emptyMessage: 'No Items to Display',
    icon: 'fa fa-fw fa-plus',
    label: null,
    options: [{ key: 10, value: 10 }, { key: 25, value: 25 }, { key: 50, value: 50 }, { key: 100, value: 100 }],
    selected: 10,
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
