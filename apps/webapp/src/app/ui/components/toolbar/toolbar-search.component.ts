import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-toolbar-search',
  template: `
    <div class="input-group">
      <input type="text"
             class="form-control is-valid"
             placeholder="search"
             [(ngModel)]="search"
             (keyup)="action.emit({ type: 'Filter', payload: search })">
      <span class="input-group-btn">
        <button class="btn btn-success text-white"
                type="button"
                (click)="action.emit({ type: 'Filter', payload: search })">
          <i class="fa fa-fw fa-search"></i>
        </button>
      </span>
    </div>
  `,
})
export class ToolbarSearchComponent {
  @Output() action = new EventEmitter()

  public search: string

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return console.log('$event', event)
      }
    }
  }
}
