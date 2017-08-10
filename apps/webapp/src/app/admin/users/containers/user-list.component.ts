import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService, ModalComponent } from '@ngx-plus/ngx-ui'
import { Account, AccountApi } from '@ngx-plus/ngx-sdk'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {

  public items: Account[]
  private modalRef: any
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public service: UsersService,
    public ui: NgxUiService,
    private api: AccountApi,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.service.users$
        .subscribe(
        (items) => this.items = items.ids.map(id => items.entities[id]),
        (error: any) => this.ui.toastError('Failed to Retrieve Users', error.message)))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe())
  }

  showDialog(type, item, options?): void {
    this.modalRef = this.modal.open(ModalComponent, { size: 'lg' })
    this.modalRef.componentInstance.item = item
    this.modalRef.componentInstance.formConfig = this.service.getFormConfig()
    switch (type) {
      case 'create':
        this.modalRef.componentInstance.title = 'Create User'
        break
      default:
        console.log('Unknown Type', type)
        break
    }
    this.subscriptions.push(
      this.modalRef.componentInstance.action
        .subscribe(event => this.handleAction(event)))
  }

  create() {
    this.showDialog('create', new Account())
  }

  handleAction(event) {
    switch (event.type) {
      case 'close':
      case 'cancel':
        return this.modalRef.close()
      case 'create':
        const fullName = event.payload.firstName + ' ' + (event.payload.middleName || '') + ' ' + event.payload.lastName + ' ' + (event.payload.suffix || '')
        event.payload.fullName = fullName.replace('  ', ' ')
        event.payload.roles = []
        this.modalRef.close()
        return this.service.create(event.payload)
      case 'update':
        return this.router.navigate([event.payload.id], { relativeTo: this.route.parent })
      case 'viewRoles':
        return this.router.navigate([event.payload.id, 'roles'], { relativeTo: this.route.parent })
      case 'delete':
        const successCb = () => this.service.delete(event.payload)
        const question = { title: 'Are you sure?', text: 'The action cannot be undone.' }
        return this.ui.alertError(question, successCb, () => ({}))
      default:
        return console.log('Unknown Event Action', event)
    }
  }

}
