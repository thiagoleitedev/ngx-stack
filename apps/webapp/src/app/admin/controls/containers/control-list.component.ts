import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

import { NgxUiService, ModalComponent, GridConfig } from '../../../ui'
import { ControlsService, Control } from '../controls.service'

@Component({
  selector: 'ngx-control-list',
  template: `
    <ngx-grid [config]="gridConfig"
              (action)="handleAction($event)">
    </ngx-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlListComponent implements OnInit {
  public gridConfig: GridConfig
  public modalRef
  private subscriptions: Subscription[]

  constructor(
    public service: ControlsService,
    public ui: NgxUiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions = []
    this.gridConfig = {
      card: {
        cardTitle: 'Controls',
        icon: 'fa fa-fw fa-sliders',
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
        columns: [
          { field: 'model', label: 'Model', action: 'Update' },
          { field: 'property', label: 'Property' },
          { field: 'accessType', label: 'Access Type' },
          { field: 'permission', label: 'Permission' },
          { field: 'principalId', label: 'Role' },
        ],
        count$: this.service.items$.map(r => r.count),
        items$: this.service.items$.map(r => r.ids.map(id => r.entities[id])),
      },
      toolbar: {
        actionButton: {
          action: 'InitCreate',
          class: 'btn btn-outline-primary btn-block',
          label: 'Create New Control',
          icon: 'fa fa-fw fa-plus',
        },
      },
    }
    this.service.roles$
      .map(roles => roles.ids.map(id => roles.entities[id]))
      .subscribe(roles => this.service.setRoles(roles))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  showModal(item, form, title) {
    this.ui.modalRef = this.ui.modal.open(ModalComponent, { size: 'lg' })
    this.ui.modalRef.componentInstance.item = item
    this.ui.modalRef.componentInstance.formConfig = form
    this.ui.modalRef.componentInstance.title = title
    this.subscriptions.push(
      this.ui.modalRef.componentInstance.action.subscribe(event =>
        this.handleAction(event)
      )
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'InitCreate':
        return this.showModal(
          new Control(),
          this.service.formConfig,
          'Create New Control'
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
