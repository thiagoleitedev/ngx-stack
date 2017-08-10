import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NavItem } from '../../../services/ngx-ui'

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
        <hr *ngIf="subTitle || (nav && !headerImg) || createButton" />
      </div>
      <div *ngIf="createButton"
           class="col-12 col-md-5">
        <button [class]="createButton.class || ''"
                (click)="action.emit($event)">
            <i [class]="'fa fa-fw fa-' + createButton.icon"></i> {{ createButton.text }}
        </button>
      </div>
      <div *ngIf="icon"
           class="col">
        <h4 class="card-title text-right mb-0">
          <i [class]="icon"></i>
        </h4>
      </div>
      <div *ngIf="nav"
           class="col-12">
        <ngx-card-header-tabs [nav]="nav"></ngx-card-header-tabs>
      </div>
    </div>
  `,
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
  @Input() subTitle: string

  @Output() action = new EventEmitter()

  constructor() { }

}
