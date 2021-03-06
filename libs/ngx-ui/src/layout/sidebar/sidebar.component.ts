import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-sidebar',
  template: `
    <div *ngIf="config.sidebar.active"
         class="sidebar"
         [class.open]="config.sidebar.open">
      <nav class="sidebar-nav">
        <ul *ngFor="let item of ui.sidebarNav"
            class="nav">
          <div *ngIf="item.title"
               class="nav-title">
            {{ item.title }}
          </div>
          <li *ngFor="let item of item.items"
              class="nav-item">
            <a class="nav-link"
               routerLinkActive="active"
               [routerLink]="item.link"><i [class]="item.icon"></i> {{ item.name }}
               <span *ngIf="item.isNew" class="badge badge-success">NEW</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() config

  constructor(public ui: NgxUiService) {}
}
