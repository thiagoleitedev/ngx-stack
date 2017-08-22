import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { NgxUiService } from '../../ui'
import { AccountApi, LoopBackAuth } from '@ngx-plus/ngx-sdk'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/startWith'

import * as Auth from '../actions/auth.actions'
import * as Ui from '../actions/ui.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: AccountApi,
    private ui: NgxUiService,
    private auth: LoopBackAuth,
    private router: Router
  ) {}

  @Effect()
  public loadToken: Observable<Action> = this.actions$
    .ofType(Auth.LOAD_TOKEN)
    .startWith(new Auth.LoadToken())
    .map(() => new Auth.LoadTokenSuccess(this.auth.getToken()))

  @Effect()
  protected login: Observable<Action> = this.actions$
    .ofType(Auth.LOG_IN)
    .mergeMap((action: Auth.LogIn) =>
      this.userApi
        .login(action.payload, 'user', true)
        .map((response: any) => new Auth.LogInSuccess(response))
        .catch((error: any) => of(new Auth.LogInFail(error)))
    )

  @Effect({ dispatch: false })
  protected loginSuccess = this.actions$
    .ofType(Auth.LOG_IN_SUCCESS)
    .do((action: Auth.LogInSuccess) =>
      this.store.dispatch(new Ui.ActivateFooter())
    )
    .do((action: Auth.LogInSuccess) =>
      this.store.dispatch(new Ui.ActivateHeader())
    )
    .do((action: Auth.LogInSuccess) =>
      this.store.dispatch(new Ui.ActivateSidebar())
    )
    .do((action: Auth.LogInSuccess) => this.router.navigate(['dashboard']))
    .map((action: Auth.LogInSuccess) =>
      this.ui.alerts.toastSuccess(
        'Log In Success',
        `You are logged in as <u><i>${action.payload.user.email}</u></i>.`
      )
    )

  @Effect({ dispatch: false })
  protected loginFail = this.actions$
    .ofType(Auth.LOG_IN_FAIL)
    .map((action: Auth.LogInFail) =>
      this.ui.alerts.toastError('Log In Failure', `${action.payload.message}`)
    )

  @Effect()
  register: Observable<Action> = this.actions$
    .ofType(Auth.REGISTER)
    .mergeMap((action: Auth.Register) =>
      this.userApi
        .create(action.payload)
        .map((response: any) => new Auth.RegisterSuccess(response))
        .catch((error: any) => of(new Auth.RegisterFail(error)))
    )

  @Effect({ dispatch: false })
  registerSuccess = this.actions$
    .ofType(Auth.REGISTER_SUCCESS)
    .map((action: Auth.RegisterSuccess) =>
      this.ui.alerts.toastSuccess(
        'Register Success',
        `<u><i>${action.payload
          .email}</i></u> has been registered successfully.`
      )
    )

  @Effect({ dispatch: false })
  registerFail = this.actions$
    .ofType(Auth.REGISTER_FAIL)
    .map((action: Auth.RegisterFail) =>
      this.ui.alerts.toastError(
        get(action, 'payload.name'),
        get(action, 'payload.message')
      )
    )

  @Effect()
  logout: Observable<Action> = this.actions$
    .ofType(Auth.LOG_OUT)
    .mergeMap((action: Auth.LogOut) =>
      this.userApi
        .logout()
        .map((response: any) => new Auth.LogOutSuccess(response))
        .catch((error: any) => of(new Auth.LogOutFail(error)))
    )

  @Effect({ dispatch: false })
  logoutSuccess = this.actions$
    .ofType(Auth.LOG_OUT_SUCCESS)
    .do((action: Auth.LogOutSuccess) => this.router.navigate(['auth']))
    .map((action: Auth.LogOutSuccess) =>
      this.ui.alerts.toastSuccess(
        'Log Out Success',
        `You have logged out successfully.`
      )
    )

  @Effect({ dispatch: false })
  logoutFail = this.actions$
    .ofType(Auth.LOG_OUT_FAIL)
    .do((action: Auth.LogOutFail) => this.router.navigate(['auth']))
    .map((action: Auth.LogOutFail) =>
      this.ui.alerts.toastError('Log Out Failure', action.payload.message)
    )

  @Effect()
  checkToken: Observable<Action> = this.actions$
    .ofType(Auth.CHECK_TOKEN)
    .mergeMap((action: Auth.LogOut) =>
      this.userApi
        .getCurrent()
        .map((response: any) => new Auth.CheckTokenSuccess(response))
        .catch((error: any) => of(new Auth.CheckTokenFail(error)))
    )

  @Effect({ dispatch: false })
  checkTokenFail = this.actions$
    .ofType(Auth.CHECK_TOKEN_FAIL)
    .map((action: Auth.CheckTokenFail) =>
      this.ui.alerts.toastError('Invalid Token', 'Redirecting to Log In screen')
    )

  @Effect({ dispatch: false })
  checkTokenSuccess = this.actions$
    .ofType(Auth.CHECK_TOKEN_SUCCESS)
    .map((action: Auth.CheckTokenSuccess) =>
      this.ui.alerts.toastSuccess(
        'Valid Token',
        `Your access token has been validated.`
      )
    )
}
