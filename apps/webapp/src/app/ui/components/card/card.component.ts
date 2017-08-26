import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { CardConfig } from '../../interfaces'

@Component({
  selector: 'ngx-card',
  template: `
    <div class="card">
      <div *ngIf="config.cardTitle || config.nav"
           [class]="'card-header bg-' + (config.headerBg || 'primary')">
        <ngx-card-header [cardTitle]="config.cardTitle"
                         [createButton]="config.createButton"
                         [headerBg]="config.headerBg"
                         [headerImg]="config.headerImg"
                         [icon]="config.icon"
                         [nav]="config.nav"
                         [postHeaderImg]="config.postHeaderImg"
                         [preHeaderImg]="config.preHeaderImg"
                         [showSearch]="config.showSearch"
                         [subTitle]="config.subTitle"
                         (action)="action.emit($event)">
        </ngx-card-header>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() config: CardConfig
  @Output() action = new EventEmitter()

  constructor() {}
}
