import { Component, OnDestroy } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RealTime, FireLoopRef, ACL, Role } from '@ngx-plus/admin-sdk'
import { NgxUiService, ModalComponent } from '@ngx-plus/ngx-ui'
import { Subscription } from 'rxjs/Subscription'

import { ControlService } from './control.service'

@Component({
  selector: 'admin-control',
  templateUrl: './control.component.html',
})
export class ControlComponent implements OnDestroy {

  private modalRef
  public controls: ACL[] = new Array<ACL>()
  private controlRef: FireLoopRef<ACL>
  public roles: Role[] = new Array<Role>()
  private roleRef: FireLoopRef<Role>
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private modal: NgbModal,
    public ui: NgxUiService,
    public service: ControlService,
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (admin: any) => {
          this.controlRef = this.rt.FireLoop.ref<ACL>(ACL)
          this.subscriptions.push(this.controlRef.on('change').subscribe(
            (controls: ACL[]) => {
              this.controls = controls
            }))
          this.roleRef = this.rt.FireLoop.ref<Role>(Role)
          this.subscriptions.push(this.roleRef.on('change').subscribe(
            (roles: Role[]) => {
              this.roles = roles
            }))
        }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  showDialog(type, item, options?) {
    this.modalRef = this.modal.open(ModalComponent, { size: 'lg' })
    this.modalRef.componentInstance.item = item
    this.modalRef.componentInstance.formConfig = this.service.getFormConfig(type, options)
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Control' : 'Update Control'
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)))
  }

  create() {
    this.showDialog('create', new ACL(), { roles: this.roles })
  }

  update(control: ACL) {
    this.showDialog('update', control, { roles: this.roles })
  }

  delete(control: ACL) {
    const question = {
      title: 'Delete Control',
      html: `
        <p class="lead">Are you sure you want to delete ACL
          <span class="font-weight-bold font-italic">${control.id}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    }
    this.ui.alertError(question, () => this.handleAction({ type: 'delete', payload: control }), () => { })
  }


  handleAction(event) {
    switch (event.type) {
      case 'close':
      case 'cancel':
        return this.modalRef.close()
      case 'create':
        this.subscriptions.push(this.controlRef.create(event.payload).subscribe(
          () => {
            this.modalRef.close()
            this.ui.toastSuccess('Control Created', 'The Control was created successfully.')
          },
          (err) => {
            this.modalRef.close()
            this.ui.toastError('Create Control Failed', err.message || err.error.message)
          },
        ))
        break
      case 'update':
        this.subscriptions.push(this.controlRef.upsert(event.payload).subscribe(
          () => {
            this.modalRef.close()
            this.ui.toastSuccess('Control Updated', 'The Control was updated successfully.')
          },
          (err) => {
            this.modalRef.close()
            this.ui.toastError('Update Control Failed', err.message || err.error.message)
          },
        ))
        break
      case 'delete':
        this.subscriptions.push(this.controlRef.remove(event.payload).subscribe(
          () => {
            this.ui.toastSuccess('Control Deleted', 'The Control was deleted successfully.')
          },
          (err) => {
            this.ui.toastError('Delete Control Failed', err.message || err.error.message)
          },
        ))
        break
      default:
        return console.log('Unknown event action', event)
    }
  }

}
