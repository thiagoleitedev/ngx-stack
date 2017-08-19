import { Component, OnInit } from '@angular/core'
import { NgxUiService } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-access-tokens',
  templateUrl: './user-access-tokens.component.html',
})
export class UserAccessTokensComponent implements OnInit {
  public item: any
  public items: any
  private subscriptions: Subscription[]

  constructor(public service: UsersService, public ui: NgxUiService) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.service.selected$.subscribe(
        user => (this.item = user),
        err => console.log(err)
      )
    )
    this.refresh()
  }

  refresh() {
    this.service.getUserAccessTokens(
      this.item,
      res => (this.items = res),
      err => console.error(err)
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'generateToken':
        return this.service.generateToken(
          this.item,
          () => {
            this.refresh()
            this.ui.alerts.toastSuccess(
              'Generate Token Success',
              `A new token has been generated for <u><i>${this.item[
                'email'
              ]}</u></i>`
            )
          },
          err => this.ui.alerts.toastError('Generate Token Fail', err.message)
        )
      case 'deleteToken':
        return this.service.deleteToken(
          {
            user: this.item,
            token: event.payload,
          },
          () => {
            this.refresh()
            this.ui.alerts.toastSuccess(
              'Delete Token Success',
              `Token <u><i>${event.payload
                .id}</u></i> has been deleted successfully`
            )
          },
          err => this.ui.alerts.toastError('Delete Token Fail', err.message)
        )
      case 'removeTtl':
        return this.service.removeTtl(
          {
            user: this.item,
            token: event.payload,
          },
          () => {
            this.refresh()
            this.ui.alerts.toastSuccess(
              'Remove TTL Success',
              `TTL for token <u><i>${event.payload
                .id} has been removed successfully`
            )
          },
          err => this.ui.alerts.toastError('Remove TTL Fail', err.message)
        )
      case 'deleteAllTokens':
        const successCb = () =>
          this.service.deleteAllTokens(
            this.item,
            () => {
              this.refresh()
              this.ui.alerts.toastSuccess(
                'Delete All Tokens Success',
                `All tokens for <u><i>${this.item[
                  'email'
                ]}</u></i> have been deleted successfully`
              )
            },
            err =>
              this.ui.alerts.toastError('Delete All Tokens Fail', err.message)
          )
        const question = {
          title: 'Are you sure?',
          text: 'This action cannot be undone',
        }
        return this.ui.alerts.alertError(question, successCb, () => ({}))
      default:
        return console.log('Unknown Event Type', event)
    }
  }
}
