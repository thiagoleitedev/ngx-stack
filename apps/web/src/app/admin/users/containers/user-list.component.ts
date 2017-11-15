import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgxUiService, ModalComponent, GridConfig } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'
import { map } from 'rxjs/operators'

import { UsersService, User } from '../users.service'

@Component({
  selector: 'ngx-user-list',
  template: `
    <ngx-grid [config]="gridConfig"
              (action)="handleAction($event)">
    </ngx-grid>
  `,
})
export class UserListComponent implements OnInit, OnDestroy {
  public gridConfig: GridConfig
  public modalRef
  private subscriptions: Subscription[]

  constructor(
    public service: UsersService,
    public ui: NgxUiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscriptions = []
    this.gridConfig = {
      card: {
        cardTitle: 'Users',
        icon: 'fa fa-fw fa-users',
        showSearch: true,
      },
      table: {
        actionButtons: [
          {
            action: 'Update',
            class: 'btn btn-outline-info btn-sm',
            icon: 'fa fa-fw fa-pencil',
          },
          {
            action: 'Delete',
            class: 'btn btn-outline-danger btn-sm',
            icon: 'fa fa-fw fa-trash',
          },
        ],
        columns: [{ field: 'fullName', label: 'Full Name', action: 'Update' }, { field: 'email', label: 'Email' }],
        count$: this.service.items$.pipe(map(r => r.count)),
        items$: this.service.items$.pipe(map(r => r.ids.map(id => r.entities[id]))),
      },
      toolbar: {
        actionButton: {
          action: 'InitCreate',
          class: 'btn btn-outline-primary btn-block',
          label: 'Create New User',
          icon: 'fa fa-fw fa-plus',
        },
      },
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  showModal(item, form, title) {
    this.ui.modalRef = this.ui.modal.open(ModalComponent, { size: 'lg' })
    this.ui.modalRef.componentInstance.item = item
    this.ui.modalRef.componentInstance.formConfig = form
    this.ui.modalRef.componentInstance.title = title
    this.subscriptions.push(this.ui.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)))
  }

  handleAction(event) {
    switch (event.type) {
      case 'InitCreate':
        const form = this.service.formConfig
        form.fields['password'] = 'password'
        return this.showModal(new User(), form, 'Create New User')
      case 'Close':
      case 'Cancel':
        return this.ui.modalRef.close()
      case 'Save':
        const fullName = new String(
          `${event.payload.firstName} ${event.payload.middleName || ''} ${event.payload.lastName} ${event.payload
            .suffix || ''}`,
        ).trim()
        event.payload.fullName = fullName
        event.payload.roles = []
        this.service.create(event.payload)
        return this.ui.modalRef.close()
      case 'Update':
        return this.router.navigate([event.payload.id], {
          relativeTo: this.route.parent,
        })
      case 'ViewUsers':
        return this.router.navigate([event.payload.id, 'users'], {
          relativeTo: this.route.parent,
        })
      case 'Delete':
        const successCb = () => this.service.delete(event.payload)
        const question = {
          title: 'Are you sure?',
          text: 'This action cannot be undone.',
        }
        return this.ui.alerts.alertError(question, successCb, () => ({}))
      default:
        return console.log('$event', event)
    }
  }
}
