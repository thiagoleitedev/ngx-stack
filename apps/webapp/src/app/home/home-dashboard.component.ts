import { Component, OnInit } from '@angular/core'
import { DashCard } from '../ui'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
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

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.items$ = this.store.select('home')
    this.setDashCards()
  }

  setDashCards() {
    this.dashCards = [
      {
        name: 'Projects',
        icon: 'fa fa-fw fa-calendar-check-o',
        data: this.items$.map(home => home.projects.count),
        link: '/home/projects',
        class: 'success',
      },
      {
        name: 'Storage',
        icon: 'fa fa-fw fa-server',
        data: this.items$.map(home => home.storage.count),
        link: '/home/storage',
        class: 'info',
      },
    ]
  }
}
