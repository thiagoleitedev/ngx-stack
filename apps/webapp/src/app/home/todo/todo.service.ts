import { Injectable } from '@angular/core'
import { RealTime, FireLoopRef, Todo } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TodoService {

  public subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private ui: NgxUiService,
  ) { }

  getCardButtons() {
    return {
      class: 'btn btn-success btn-block mt-3',
      icon: 'plus',
      text: 'Create'
    }
  }

  getTableHeaders() {
    return [
      'Text',
      'Due Date',
      'Done?',
      'Actions',
    ]
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      buttonColClass: 'col-12',
      action: formType === 'create' ? formType : 'update',
    }
  }

  getFormFields(formType: string) {
    const fields = [
      this.ui.form.input('text', {
        label: 'Text',
        addonLeft: {
          class: 'fa fa-fw fa-commenting'
        }
      }),
      this.ui.form.date('dueAt', {
        label: 'Due Date'
      }),
    ]
    if (formType === 'update') {
      fields.push(
        this.ui.form.checkbox('done', {
          label: 'Done?',
        }),
      )
    }
    return fields
  }

}
