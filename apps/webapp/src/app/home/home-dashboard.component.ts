import { Component, OnInit, AfterViewInit } from '@angular/core'
import { DashCard, NgxUiService, NavItem } from '../ui'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

import { ProjectActions } from '../state'

@Component({
  selector: 'home-dashboard',
  template: `
  <ngx-card [config]="cardConfig">
    <ngx-dash-cards *ngIf="items$ | async" [items]="dashCards"></ngx-dash-cards>
  </ngx-card>
  `,
})
export class HomeDashboardComponent implements OnInit {
  public dashCards: DashCard[]
  public items$: Observable<any>
  public cardConfig = {
    icon: 'fa fa-fw fa-tachometer',
    cardTitle: 'Dashboard',
  }

  constructor(private ui: NgxUiService, private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new ProjectActions.ReadProjects())
    this.items$ = this.store.select('projects')
    this.setDashCards()
  }

  setDashCards() {
    this.dashCards = [
      {
        name: 'Projects',
        icon: 'fa fa-fw fa-calendar-check-o',
        data: this.items$.map(projects => projects.count),
        link: '/home/projects/list',
        class: 'success',
      },
    ]
  }
}
