import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { NavItem } from '../../../interfaces'

@Component({
  selector: 'ngx-card-header-tabs',
  template: `
    <ul class="nav nav-tabs card-header-tabs">
      <li *ngFor="let item of nav.items"
          class="nav-item">
        <a [routerLink]="item.link"
           routerLinkActive="active"
           class="nav-link">
            <i *ngIf="item.icon" [class]="item.icon"></i>
            {{ item.name }}
          </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderTabsComponent {
  @Input() nav: NavItem
}
