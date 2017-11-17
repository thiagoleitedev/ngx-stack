import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { DashCard } from '@ngx-plus/ngx-ui'

@Component({
  selector: 'home-dashboard',
  template: `
    <ngx-dash-cards *ngIf="items$ | async"
                    [items]="dashCards">
    </ngx-dash-cards>
  `,
})
export class HomeDashboardComponent implements OnInit {
  public dashCards: DashCard[]
  public items$: Observable<any>

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
        data: this.items$.pipe(map(home => home.projects.count)),
        link: '/home/projects',
        class: 'success',
      },
      {
        name: 'Storage',
        icon: 'fa fa-fw fa-server',
        data: this.items$.pipe(map(home => home.storage.count)),
        link: '/home/storage',
        class: 'info',
      },
    ]
  }
}
