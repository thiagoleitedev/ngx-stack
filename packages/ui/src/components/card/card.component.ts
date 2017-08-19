import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NavItem } from '../../interfaces'

@Component({
  selector: 'ngx-card',
  template: `
    <div class="card">
      <div *ngIf="cardTitle || nav"
           [class]="'card-header bg-' + (headerBg || 'primary')">
        <ngx-card-header [cardTitle]="cardTitle"
                         [createButton]="createButton"
                         [headerBg]="headerBg"
                         [headerImg]="headerImg"
                         [icon]="icon"
                         [nav]="nav"
                         [postHeaderImg]="postHeaderImg"
                         [preHeaderImg]="preHeaderImg"
                         [subTitle]="subTitle"
                         (action)="action.emit($event)">
        </ngx-card-header>
      </div>
      <div class="card-block">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {

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
