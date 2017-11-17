import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { map } from 'rxjs/operators'

import { NgxUiService, ModalComponent, GridConfig } from '@ngx-plus/ngx-ui'

import { StorageService, Container } from '../storage.service'

@Component({
  selector: 'ngx-container-list',
  template: `
    <ngx-grid [config]="gridConfig"
              (action)="handleAction($event)">
    </ngx-grid>
    <ng-template #filesTRef let-row="row" let-value="value">
      <button class="btn btn-outline-info p-1"
              (click)="handleAction({ type: 'ViewFiles', payload: row })">
        <i class="fa fa-fw fa-search"></i>
        <span class="badge badge-info text-white m-0">{{ value.length | number }}</span>
      </button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerListComponent implements OnInit {
  @ViewChild('filesTRef') filesTRef: TemplateRef<any>
  public gridConfig: GridConfig
  public modalRef
  private subscriptions: Subscription[]

  constructor(
    public service: StorageService,
    public ui: NgxUiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions = []
    this.gridConfig = {
      card: {
        cardTitle: 'Storage',
        icon: 'fa fa-fw fa-server',
        showSearch: true,
      },
      table: {
        actionButtons: [
          {
            action: 'Upload',
            class: 'btn btn-outline-info btn-sm',
            icon: 'fa fa-fw fa-cloud-upload',
          },
          {
            action: 'Delete',
            class: 'btn btn-outline-danger btn-sm',
            icon: 'fa fa-fw fa-trash',
          },
        ],
        columns: [
          { field: 'name', label: 'Container', action: 'ViewFiles' },
          { field: 'files', label: 'Files', cellTemplate: this.filesTRef },
        ],
        count$: this.service.items$.map(items => items.count),
        items$: this.service.items$.map(items => items.ids.map(id => items.entities[id])),
      },
      toolbar: {
        actionButton: {
          action: 'InitCreate',
          class: 'btn btn-outline-primary btn-block',
          label: 'Create New Container',
          icon: 'fa fa-fw fa-plus',
        },
      },
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  showModal(item, form, title) {
    this.ui.modalRef = this.ui.modal.open(ModalComponent, { size: 'sm' })
    this.ui.modalRef.componentInstance.item = item
    this.ui.modalRef.componentInstance.formConfig = form
    this.ui.modalRef.componentInstance.title = title
    this.subscriptions.push(this.ui.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)))
  }

  handleAction(event) {
    switch (event.type) {
      case 'InitCreate':
        const form = this.service.formConfig
        return this.showModal(new Container(), form, 'Create New Container')
      case 'Close':
      case 'Cancel':
        return this.ui.modalRef.close()
      case 'Save':
        this.service.create(event.payload)
        return this.ui.modalRef.close()
      case 'Upload':
        return this.router.navigate([event.payload.name, 'upload'], {
          relativeTo: this.route.parent,
        })
      case 'ViewFiles':
        return this.router.navigate([event.payload.name, 'files'], {
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
