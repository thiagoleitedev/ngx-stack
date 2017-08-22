import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute } from '@angular/router'
import {
  NgxUiService,
  ModalComponent,
  CardConfig,
  TableConfig,
  ToolbarConfig,
} from '../../../ui'
import { Role, RoleApi } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/operator/map'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-list',
  template: `
    <ngx-grid [cardConfig]="cardConfig"
              [tableConfig]="tableConfig"
              [toolbarConfig]="toolbarConfig"
              (action)="handleAction($event)">
    </ngx-grid>
  `,
})
export class RoleListComponent implements OnInit {
  public cardConfig: CardConfig
  public tableConfig: TableConfig
  public toolbarConfig: ToolbarConfig
  public modalRef

  constructor(
    public service: RolesService,
    public ui: NgxUiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cardConfig = {
      cardTitle: 'Roles',
      icon: 'fa fa-fw fa-tags',
      showSearch: true,
    }

    this.tableConfig = {
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
      columns: [
        { field: 'name', name: 'Name', action: 'Update' },
        { field: 'description', name: 'Description' },
      ],
      count$: this.service.items$.map(r => r.count),
      items$: this.service.items$.map(r => r.ids.map(id => r.entities[id])),
    }

    this.toolbarConfig = {
      actionButton: {
        action: 'InitCreate',
        class: 'btn btn-outline-primary btn-block',
        label: 'Create New Role',
        icon: 'fa fa-fw fa-plus',
        item: new Role(),
      },
    }
  }

  showModal(item, form, title) {
    this.ui.modalRef = this.ui.modal.open(ModalComponent, { size: 'sm' })
    this.ui.modalRef.componentInstance.item = item
    this.ui.modalRef.componentInstance.formConfig = form
    this.ui.modalRef.componentInstance.title = title
    this.ui.modalRef.componentInstance.action.subscribe(event =>
      this.handleAction(event)
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'InitCreate':
        return this.showModal(
          event.payload,
          this.service.formConfig,
          'Create New Role'
        )
      case 'Close':
      case 'Cancel':
        return this.ui.modalRef.close()
      case 'Save':
        event.payload.principals = []
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
