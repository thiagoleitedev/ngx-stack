import { Component, OnDestroy } from '@angular/core'
import { NgxUiService } from '../../ui'
import { RealTime, FireLoopRef, Todo } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'

import { TodoService } from './todo.service'

@Component({
  selector: 'ngx-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnDestroy {

  private modalRef
  public todos: Todo[] = new Array<Todo>()
  public buttons
  private todoRef: FireLoopRef<Todo>
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public ui: NgxUiService,
    public todoService: TodoService,
    private rt: RealTime
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (ngx: any) => {
          this.todoRef = this.rt.FireLoop.ref<Todo>(Todo)
          this.subscriptions.push(this.todoRef.on('change').subscribe(
            (todos: Todo[]) => {
              this.todos = todos
            }))
        }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  showDialog(type, item) {
  }

  create() {
    this.showDialog('create', new Todo())
  }

  update(todo: Todo) {
    this.showDialog('update', todo)
  }

  delete(todo: Todo) {
    const question = {
      title: 'Delete Todo',
      html: `
        <p class="lead">Are you sure you want to delete the
          <span class="font-weight-bold font-italic">${todo.text}</span> Todo?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    }
    this.ui.alerts.alertError(question, () => this.handleAction({ type: 'delete', payload: todo }), () => { })
  }

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.todoRef.create(event.payload).subscribe(
          () => {
            this.modalRef.close()
            this.ui.alerts.toastSuccess('Todo Created', 'The Todo was created successfully.')
          },
          (err) => {
            this.modalRef.close()
            this.ui.alerts.toastError('Create Todo Failed', err.message || err.error.message)
          },
        ))
        break
      case 'update':
        this.subscriptions.push(this.todoRef.upsert(event.payload).subscribe(
          () => {
            this.modalRef.close()
            this.ui.alerts.toastSuccess('Todo Updated', 'The Todo was updated successfully.')
          },
          (err) => {
            this.modalRef.close()
            this.ui.alerts.toastError('Update Todo Failed', err.message || err.error.message)
          },
        ))
        break
      case 'delete':
        this.subscriptions.push(this.todoRef.remove(event.payload).subscribe(
          () => {
            this.ui.alerts.toastSuccess('Todo Deleted', 'The Todo was deleted successfully.')
          },
          (err) => {
            this.ui.alerts.toastError('Delete Todo Failed', err.message || err.error.message)
          },
        ))
        break
      default:
        return console.log('Unknown event action', event)
    }
  }

}
