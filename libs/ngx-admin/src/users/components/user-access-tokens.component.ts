import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { NgxUiService, DropButton } from '@ngx-plus/ngx-ui'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-access-tokens',
  templateUrl: './user-access-tokens.component.html',
})
export class UserAccessTokensComponent implements OnInit {
  public item$: Observable<any>
  public items$: Observable<any[]>
  public dropConfig: DropButton
  private subscriptions: Subscription[]

  constructor(public service: UsersService, public ui: NgxUiService) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.item$ = this.service.selected$
    this.items$ = this.item$.map(item => item.accessTokens)
    this.dropConfig = {
      action: 'RemoveTtl',
      class: 'btn btn-danger btn-sm',
      label: '',
      options: [{ key: 'Remove TTL', value: 'RemoveTtl' }],
    }
    this.refresh()
  }

  refresh() {
    this.service.getUserAccessTokens(
      this.service.selected,
      res => {
        this.service.selected.accessTokens = res
        this.service.setSelected(this.service.selected)
      },
      err =>
        this.ui.alerts.notifyError({
          title: 'Read Tokens Failure',
          body: err.message,
        })
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'GenerateToken': {
        return this.service.generateToken(
          this.service.selected,
          res => {
            this.ui.alerts.notifySuccess({
              title: 'Generate Token Success',
              body: `A new token has been generated for <u><i>${this.service.selected['email']}</u></i>`,
            })
            this.refresh()
          },
          err =>
            this.ui.alerts.notifyError({
              title: 'Generate Token Fail',
              body: err.message,
            })
        )
      }
      case 'DeleteToken': {
        return this.service.deleteToken(
          {
            user: this.service.selected,
            token: event.payload,
          },
          res => {
            this.ui.alerts.notifySuccess({
              title: 'Delete Token Success',
              body: `Token <u><i>${event.payload.id}</u></i> has been deleted successfully`,
            })
            this.refresh()
          },
          err =>
            this.ui.alerts.notifyError({
              title: 'Delete Token Fail',
              body: err.message,
            })
        )
      }
      case 'RemoveTtl': {
        return this.service.removeTtl(
          {
            user: this.service.selected,
            token: event.payload,
          },
          res => {
            this.ui.alerts.notifySuccess({
              title: 'Remove TTL Success',
              body: `TTL for token <u><i>${event.payload.id} has been removed successfully`,
            })
            this.refresh()
          },
          err =>
            this.ui.alerts.notifyError({
              title: 'Remove TTL Fail',
              body: err.message,
            })
        )
      }
      case 'DeleteAllTokens': {
        const successCb = () =>
          this.service.deleteAllTokens(
            this.service.selected,
            res => {
              this.ui.alerts.notifySuccess({
                title: 'Delete All Tokens Success',
                body: `All tokens for <u><i>${this.service.selected['email']}</u></i> have been deleted successfully`,
              })
              this.refresh()
            },
            err =>
              this.ui.alerts.notifyError({
                title: 'Delete All Tokens Fail',
                body: err.message,
              })
          )
        const question = {
          title: 'Are you sure?',
          text: 'This action cannot be reversed.',
        }
        return this.ui.alerts.alertError(question, successCb, () => ({}))
      }
      default: {
        return console.log('Unknown Event Type', event)
      }
    }
  }
}
