import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { combineLatest, map } from 'rxjs/operators'

import { NgxUiService, NgxDropButton } from '@ngx-plus/ngx-ui'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-users',
  template: `
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th [style.text-align]="'left'">Name</th>
          <th [style.text-align]="'left'">Email</th>
          <th [style.text-align]="'right'">
            <ngx-drop-button [config]="dropConfig"
                             (action)="handleAction($event)">
            </ngx-drop-button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of (items$ | async)">
          <td><i class="fa fa-tag"></i> &nbsp; {{ item?.fullName }}</td>
          <td>{{ item?.email }}</td>
          <td [style.text-align]="'right'">
            <button class="btn btn-danger btn-sm"
                    (click)="handleAction({ type: 'RemoveUser', payload: item })">
              <i class="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleUsersComponent implements OnInit {
  public item: any
  public itemIds: string[]
  public items$: Observable<any>
  public users: Account[]
  public columns = [
    {
      label: 'Role',
      field: 'name',
    },
    {
      label: 'Description',
      field: 'description',
    },
  ]
  public dropConfig: NgxDropButton

  constructor(public service: RolesService, public ui: NgxUiService) {}

  ngOnInit() {
    this.dropConfig = {
      action: 'AddUser',
      class: 'btn btn-outline-success',
      icon: 'fa fa-fw fa-plus',
      label: 'Add User',
    }
    this.items$ = this.service.selected$.combineLatest(this.service.users$, (role, users) => {
      this.item = role
      this.itemIds = role.principals.map(principal => principal.principalId)
      this.dropConfig.options = users.ids
        .map(id => users.entities[id])
        .filter(user => this.itemIds.indexOf(user.id) === -1)
        .map(user => {
          return { key: user.fullName, value: user }
        })
      return role.principals.map(principal => users.entities[principal.principalId])
    })
  }

  handleAction(event) {
    switch (event.type) {
      case 'AddUser':
        return this.service.addUserToRole({
          role: this.item,
          user: event.payload.value,
        })
      case 'RemoveUser':
        return this.service.removeUserFromRole({
          role: this.item,
          user: event.payload,
        })
      default:
        return console.log('$event', event)
    }
  }
}
