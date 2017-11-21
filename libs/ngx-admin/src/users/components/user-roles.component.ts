import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { NgxDropButton } from '@ngx-plus/ngx-ui'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-roles',
  template: `
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th [style.text-align]="'left'">Name</th>
          <th [style.text-align]="'left'">Description</th>
          <th [style.text-align]="'right'">
            <ngx-drop-button [config]="dropConfig"
                             (action)="handleAction($event)">
            </ngx-drop-button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of (items$ | async)">
          <td><i class="fa fa-tag"></i> &nbsp; {{ item?.name }}</td>
          <td>{{ item?.description }}</td>
          <td [style.text-align]="'right'">
            <button class="btn btn-danger btn-sm"
                    (click)="handleAction({ type: 'RemoveRole', payload: item })">
              <i class="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class UserRolesComponent implements OnInit {
  public item: any
  public itemIds: string[]
  public items$: Observable<any>
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

  constructor(public service: UsersService) {}

  ngOnInit() {
    this.dropConfig = {
      action: 'AddRole',
      class: 'btn btn-outline-success',
      icon: 'fa fa-fw fa-plus',
      label: 'Add Role',
    }
    this.items$ = this.service.selected$.combineLatest(this.service.roles$, (user, roles) => {
      this.item = user
      this.itemIds = user.roles.map(role => role.id)
      this.dropConfig.options = roles.ids
        .map(id => roles.entities[id])
        .filter(role => this.itemIds.indexOf(role.id) === -1)
        .map(role => {
          return { key: role.name, value: role }
        })
      return user.roles.map(role => roles.entities[role.id])
    })
  }

  handleAction(event) {
    switch (event.type) {
      case 'AddRole':
        return this.service.addUserToRole({
          user: this.item,
          role: event.payload.value,
        })
      case 'RemoveRole':
        return this.service.removeUserFromRole({
          user: this.item,
          role: event.payload,
        })
      default:
        return console.log('$event', event)
    }
  }
}
