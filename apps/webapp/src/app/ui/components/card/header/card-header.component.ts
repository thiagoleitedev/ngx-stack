import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { NavItem } from '../../../interfaces'

@Component({
  selector: 'ngx-card-header',
  template: `
    <div class="row align-items-center justify-content-center">
      <div *ngIf="headerImg"
           class="col-12">
        <ngx-card-header-brand [headerImg]="headerImg"
                                 [postHeaderImg]="postHeaderImg"
                                 [preHeaderImg]="preHeaderImg">
        </ngx-card-header-brand>
      </div>
      <div class="col">
        <ngx-card-header-title [cardTitle]="cardTitle"
                               [subTitle]="subTitle">
        </ngx-card-header-title>
        <hr *ngIf="subTitle || (nav && !headerImg) || showSearch" />
      </div>
      <div *ngIf="showSearch"
           class="col-12 col-md-5">
           <ngx-toolbar-filter (action)="action.emit($event)"></ngx-toolbar-filter>
      </div>
      <div *ngIf="icon"
           class="col align-self-start">
        <h4 class="card-title text-right">
          <i [class]="icon"></i>
        </h4>
      </div>
      <div *ngIf="nav"
           class="col-12">
        <ngx-card-header-tabs [nav]="nav"></ngx-card-header-tabs>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() cardTitle: string
  @Input() createButton: any
  @Input() headerBg: string
  @Input() headerImg: string
  @Input() icon: string
  @Input() nav: NavItem
  @Input() postHeaderImg: string
  @Input() preHeaderImg: string
  @Input() showSearch: boolean
  @Input() subTitle: string

  @Output() action = new EventEmitter()

  constructor() {}
}
