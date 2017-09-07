import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderTitleComponent {
  @Input() cardTitle: string
  @Input() subTitle: string

  @Output() action = new EventEmitter()
}
