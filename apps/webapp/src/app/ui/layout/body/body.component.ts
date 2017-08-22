import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'ngx-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {
  @Input() config

  constructor() {}
}
