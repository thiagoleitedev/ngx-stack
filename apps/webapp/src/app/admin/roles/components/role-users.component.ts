import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { RoleApi, Role } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-users',
  templateUrl: './role-users.component.html',
})
export class RoleUsersComponent implements OnInit, OnDestroy {

  public item: any
  public items: any[]
  public options: any[]
  public users: any[]
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
    public service: RolesService,
    public ui: NgxUiService,
  ) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.service.users$.subscribe(
        (users) => {
          this.users = users.ids.map(id => users.entities[id])
        }))
    this.subscriptions.push(
      this.service.selected$.subscribe(
        (role) => {
          const userIds = role.principals.map(p => p.principalId)
          this.item = role
          this.items = this.users.filter(u => userIds.indexOf(u.id) !== -1)
          this.options = this.users.filter(u => userIds.indexOf(u.id) === -1)
        },
        (err) => console.log(err)))

  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe())
  }

  handleAction(event) {
    switch (event.type) {
      case 'addUser':
        return this.service.addUserToRole({
          role: this.item,
          user: event.payload
        })
      case 'removeUser':
        return this.service.removeUserFromRole({
          role: this.item,
          user: event.payload
        })
      default:
        return console.log('Unknown Event Type', event)
    }
  }

}
