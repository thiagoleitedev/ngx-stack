import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Project } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

import { NgxUiService, ModalComponent, GridConfig } from '../../../ui'
import { ProjectActions } from '../../../state'
import { ProjectsService } from '../projects.service'

@Component({
  selector: 'ngx-project-list',
  template: `
    <ngx-grid [config]="gridConfig"
              (action)="handleAction($event)">
    </ngx-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
  public gridConfig: GridConfig
  public modalRef
  private subscriptions: Subscription[]

  constructor(
    public service: ProjectsService,
    public ui: NgxUiService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.subscriptions = []
    this.gridConfig = {
      card: {
        cardTitle: 'Projects',
        icon: 'fa fa-fw fa-calendar-check-o',
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
          { field: 'name', label: 'Name', action: 'Update' },
          { field: 'description', label: 'Description' },
        ],
        count$: this.service.items$.map(item => item.count),
        items$: this.service.items$.map(item =>
          item.ids.map(id => item.entities[id]),
        ),
      },
      toolbar: {
        actionButton: {
          action: 'InitCreate',
          class: 'btn btn-outline-primary btn-block',
          label: 'Create New Project',
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
    this.subscriptions.push(
      this.ui.modalRef.componentInstance.action.subscribe(event =>
        this.handleAction(event),
      ),
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'InitCreate':
        const form = this.service.formConfig
        return this.showModal(new Project(), form, 'Create New Project')
      case 'Close':
      case 'Cancel':
        return this.ui.modalRef.close()
      case 'Save':
        this.service.create(event.payload)
        return this.ui.modalRef.close()
      case 'Update':
        return this.router.navigate([event.payload.id], {
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
