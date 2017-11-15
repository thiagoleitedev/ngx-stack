import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-layout',
  template: `
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-12 p-0">
        <ngx-header [config]="config"
                    [user]="user"
                    (action)="handleAction($event)">
        </ngx-header>
        <nav *ngIf="config.header.active" aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"></li>
          </ol>
        </nav>
        <ngx-sidebar [config]="config"></ngx-sidebar>
        <ngx-body [config]="config">
          <router-outlet></router-outlet>
        </ngx-body>
        <ngx-footer [config]="config"></ngx-footer>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input() config
  @Input() user
  @Output() action = new EventEmitter()

  constructor() {}

  handleAction(event) {
    switch (event.type) {
      default:
        return this.action.emit(event)
    }
  }
}
