import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService, ModalComponent } from '@ngx-plus/ngx-ui'
import { Role, RoleApi } from '@ngx-plus/ngx-sdk'
import { orderBy, values, includes, filter, isMatch, keysIn } from 'lodash'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-list',
  template: `
    <ngx-card cardTitle="Roles"
              icon="fa fa-fw fa-tags"
              [createButton]="service.getCardButtons()"
              (action)="create()">
      <ngx-grid [columns]="service.tableColumns"
                [items]="items"
                (action)="handleAction($event)">
      </ngx-grid>
    </ngx-card>
  `,
})
export class RoleListComponent implements OnInit, OnDestroy {

  public items: Role[]
  private modalRef: any
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public service: RolesService,
    public ui: NgxUiService,
    private api: RoleApi,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.service.roles$.subscribe(
        (items) => {
          this.items = items.ids.map(id => items.entities[id])
        },
        (error: any) => this.ui.toastError('Failed to Retrieve Roles', error.message)
      ))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe())
  }

  showDialog(type, item, options?): void {
    this.modalRef = this.modal.open(ModalComponent, { size: 'sm' })
    this.modalRef.componentInstance.item = item
    this.modalRef.componentInstance.formConfig = this.service.getFormConfig()
    switch (type) {
      case 'create':
        this.modalRef.componentInstance.title = 'Create Role'
        break
      default:
        return console.log('$modal', type)
    }
    this.subscriptions.push(
      this.modalRef.componentInstance.action
        .subscribe(event => this.handleAction(event)))
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
        return this.router.navigate([event.payload.id], { relativeTo: this.route.parent })
      case 'viewUsers':
        return this.router.navigate([event.payload.id, 'users'], { relativeTo: this.route.parent })
      case 'delete':
        const successCb = () => this.service.delete(event.payload)
        const question = { title: 'Are you sure?', text: 'This action cannot be undone.' }
        return this.ui.alertError(question, successCb, () => ({}))
      default:
        return console.log('$event', event)
    }
  }

}
