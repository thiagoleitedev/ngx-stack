import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-toolbar',
  template: `
  <div class="row align-items-center justify-content-center toolbar-wrapper">
    <div class="col-md-4 col-lg-3">
      <ngx-toolbar-view [options]="viewOptions"
                        [selected]="viewSelection"
                        (action)="handleAction($event)">
      </ngx-toolbar-view>
    </div>
    <div class="col-md-4 col-lg-6">
      <ngx-toolbar-action (action)="handleAction($event)"></ngx-toolbar-action>
    </div>
    <div class="col-md-4 col-lg-3">
      <ngx-toolbar-drop (action)="handleAction($event)"></ngx-toolbar-drop>
    </div>
  </div>
  `,
  styles: [
    `
    .toolbar-wrapper {
      background: #f7f7f7;
      margin-top: -20px;
      padding   : 20px 0;
    }
  `,
  ],
})
export class ToolbarComponent {
  @Input() rowOptions: any[] = [10, 25, 50, 100]
  @Input() rowSelection: any = 10
  @Input()
  viewOptions: {
    value: string
    icon: string
  }[]
  @Input() viewSelection: string

  @Output() action = new EventEmitter()

  public search: string

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
