import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'
import { NgxUiService } from '../../../ui'
import { RoleApi, Role } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-roles',
  templateUrl: './user-roles.component.html',
  styles: [`
      .dropdown-menu {
        left: auto;
        right: 0;
      }
    `]
})
export class UserRolesComponent implements OnInit, OnDestroy {

  public item: any
  public items: any[]
  public options: any[]
  public roles: any[]
  public columns = [
    {
      label: 'Role',
      field: 'name',
    },
    {
      label: 'Description',
      field: 'description',
    }
  ]

  private subscriptions: Subscription[] = []

  constructor(
    public service: UsersService,
    public ui: NgxUiService,
  ) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.service.roles$.subscribe(
        (roles) => {
          this.roles = roles.ids.map(id => roles.entities[id])
        },
        (err) => console.log(err)))
    this.subscriptions.push(
      this.service.selected$.subscribe(
        (user) => {
          const roleIds = user.roles.map(r => r.id)
          this.item = user
          this.items = user.roles
          this.options = this.roles.filter(r => roleIds.indexOf(r.id) === -1)
        },
        (err) => console.log(err)))

  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe())
  }

  handleAction(event) {
    switch (event.type) {
      case 'addRole':
        return this.service.addUserToRole({
          user: this.item,
          role: event.payload
        })
      case 'removeRole':
        return this.service.removeUserFromRole({
          user: this.item,
          role: event.payload
        })
      default:
        return console.log('Unknown Event Type', event)
    }
  }

}
