import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NavItem } from '../../../services/ngx-ui'

@Component({
  selector: 'ngx-card-header-title',
  template: `
    <h4 *ngIf="cardTitle"
        class="card-title text-uppercase mb-0">
      {{ cardTitle }}
    </h4>
    <p *ngIf="subTitle"
       class="card-subtitle lead text-left">{{ subTitle }}
    </p>
  `,
})
export class CardHeaderTitleComponent {

  @Input() cardTitle: string
  @Input() subTitle: string

  @Output() action = new EventEmitter()

  constructor() { }

}
