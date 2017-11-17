import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'ngx-dashboard',
  template: `
    <ngx-card [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
})
export class DashboardComponent implements OnInit {
  public cardConfig = {
    icon: 'fa fa-fw fa-tachometer',
    cardTitle: 'Dashboard',
    nav: {
      title: 'Dashboard',
      items: [
        { name: 'Home', link: '/dashboard/home', icon: 'fa fa-fw fa-home' },
        {
          name: 'Admin',
          link: '/dashboard/admin',
          icon: 'fa fa-fw fa-lock',
        },
      ],
    },
  }

  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
