import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-body',
  template: `
    <div class="app-body"
         [class.open]="config.sidebar.open && config.sidebar.active">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {
  @Input() config

  constructor() {}
}
