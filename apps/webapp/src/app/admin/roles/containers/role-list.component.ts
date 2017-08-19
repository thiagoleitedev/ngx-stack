import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute } from '@angular/router'
import { NgxUiService, ModalComponent } from '../../../ui'
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
              [count$]="count$"
              [items$]="items$"
              (action)="handleAction($event)">
    </ngx-grid>
  `,
})
export class RoleListComponent implements OnInit, OnDestroy {
  public cardConfig = {
    cardTitle: 'Roles',
    icon: 'fa fa-fw fa-tags',
    showSearch: true,
  }
  public tableConfig = {
    columnMode: 'force',
    columns: [
      { field: 'name', name: 'Name', action: 'update' },
      { field: 'description', name: 'Description' },
    ],
    cssClasses: {
      sortAscending: 'fa fa-fw fa-angle-up',
      sortDescending: 'fa fa-fw fa-angle-down',
      pagerLeftArrow: 'fa fa-fw fa-angle-left',
      pagerRightArrow: 'fa fa-fw fa-angle-right',
    },
    footerHeight: 0,
    headerHeight: 40,
    limit: 10,
    loadingIndicator: false,
    messages: {
      emptyMessage: 'No data to display',
      totalMessage: 'Total',
    },
    offset: 0,
    sortType: 'single',
  }
  public count$: Observable<number>
  public items$: Observable<Role[]>
  private modalRef: any
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public service: RolesService,
    public ui: NgxUiService,
    private api: RoleApi,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.items$ = this.service.roles$.map(r => r.ids.map(id => r.entities[id]))
    this.count$ = this.service.roles$.map(r => r.count)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    )
  }

  showDialog(type, item, options?): void {
    this.modalRef = this.modal.open(ModalComponent, { size: 'sm' })
    this.modalRef.componentInstance.item = item
    this.modalRef.componentInstance.formConfig = {}
    switch (type) {
      case 'create':
        this.modalRef.componentInstance.title = 'Create Role'
        break
      default:
        return console.log('$modal', type)
    }
    this.subscriptions.push(
      this.modalRef.componentInstance.action.subscribe(event =>
        this.handleAction(event)
      )
    )
  }

  create() {
    this.showDialog('create', new Role())
  }

  handleAction(event) {
    switch (event.type) {
      case 'close':
      case 'cancel':
        return this.modalRef.close()
      case 'create':
        event.payload.principals = []
        this.modalRef.close()
        return this.service.create(event.payload)
      case 'update':
        return this.router.navigate([event.payload.id], {
          relativeTo: this.route.parent,
        })
      case 'viewUsers':
        return this.router.navigate([event.payload.id, 'users'], {
          relativeTo: this.route.parent,
        })
      case 'delete':
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
