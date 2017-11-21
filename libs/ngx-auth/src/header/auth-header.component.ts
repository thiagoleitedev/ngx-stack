import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { AccountApi } from '@ngx-plus/ngx-sdk'
import { NgxUiActions, NgxUiService, NgxActionButton } from '@ngx-plus/ngx-ui'

@Component({
  selector: 'ngx-auth-header',
  template: `
    <div class="auth-header fixed-top">
      <h2 class="text-white text-center mb-3">
        {{ ui.preHeaderImg }}
        <img *ngIf="ui.authHeaderImg"
             [src]="ui.authHeaderImg"
             height="70px" />
        {{ ui.postHeaderImg }}
      </h2>
      <div class="row align-items-center justify-content-center">
        <div *ngFor="let button of actionButtons"
             class="col-6 col-lg-4">
          <ngx-action-button [config]="button"
                             [routerLink]="button.item"
                             routerLinkActive="active">
          </ngx-action-button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthHeaderComponent implements OnInit {
  @Input()
  actionButtons: NgxActionButton[] = [
    {
      action: 'LogInNav',
      class: 'btn btn-outline-success btn-block',
      icon: 'fa fa-fw fa-sign-in',
      item: '/auth/login',
      label: 'Log In',
    },
    {
      action: 'RegisterNav',
      class: 'btn btn-outline-success btn-block',
      icon: 'fa fa-fw fa-user-plus',
      item: '/auth/register',
      label: 'Register',
    },
  ]

  constructor(public ui: NgxUiService, private store: Store<any>) {}

  ngOnInit() {}
}
