import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-toolbar-drop',
  template: `
    <div ngbDropdown
         class="d-inline-block float-right">
      <button ngbDropdownToggle
              class="btn btn-outline-success options"
              id="tbDrop">{{ selected }}
      </button>
      <div ngbDropdownMenu
           class="dropdown-menu-right"
           aria-labelledby="tbDrop">
        <button *ngFor="let option of options"
                class="dropdown-item"
                (click)="action.emit({ type: 'ToolbarDropSelection', payload: option }); selected = option"
                [class.bg-success]="selected === option"> {{ option }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .options {
      width: 100px;
    }

    .dropdown-menu-right {
      min-width: 100px;
      top: 0;
    }

    .dropdown-item {
      text-align: center;
    }

    .bg-success {
      color: #fff;
    }
  `,
  ],
})
export class ToolbarDropComponent {
  @Input() selected: any = 10
  @Input() options = [10, 25, 50, 100]
  @Output() action = new EventEmitter()

  constructor() {}

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
