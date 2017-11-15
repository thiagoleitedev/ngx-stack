import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { of } from 'rxjs/observable/of'
import { catchError, tap, map, mergeMap, startWith } from 'rxjs/operators'
import { NgxUiService } from '../../ui'
import {
  AccountApi,
  LoopBackAuth,
  LoopbackAuthActionTypes,
  LoopbackAuthActions,
  LoopbackAction,
  AccountActionTypes,
  AccountActions,
} from '@ngx-plus/ngx-sdk'
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
    private router: Router,
  ) {}

  @Effect()
  protected checkToken$ = this.actions$
    .ofType(Auth.CHECK_TOKEN)
    .pipe(
      startWith(new Auth.CheckToken()),
      tap(() => new Ui.ActivateLoader()),
      mergeMap((action: Auth.CheckToken) =>
        this.userApi
          .getCurrent()
          .pipe(
            map((response: any) => new Auth.CheckTokenSuccess(response)),
            catchError((error: any) => of(new Auth.CheckTokenFail(error))),
          ),
      ),
    )

  @Effect({ dispatch: false })
  protected checkTokenSuccess$ = this.actions$.ofType(Auth.CHECK_TOKEN_SUCCESS).pipe(
    tap((action: Auth.CheckTokenSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Valid Token',
        body: `Your access token has been validated.`,
      }),
    ),
  )

  @Effect({ dispatch: false })
  protected checkTokenFail$ = this.actions$.ofType(Auth.CHECK_TOKEN_FAIL).pipe(
    tap((action: Auth.CheckTokenFail) => {
      this.router.navigate(['auth'])
      this.ui.alerts.notifyError({
        title: 'Invalid Token',
        body: 'Redirecting to Log In screen',
      })
    }),
  )

  @Effect({ dispatch: false })
  protected login$ = this.actions$.ofType(AccountActionTypes.LOGIN).pipe(tap(() => new Ui.ActivateLoader()))

  @Effect({ dispatch: false })
  protected loginSuccess$ = this.actions$.ofType(AccountActionTypes.LOGIN_SUCCESS).pipe(
    tap((action: LoopbackAction) => this.router.navigate(['dashboard'])),
    tap((action: LoopbackAction) => {
      this.store.dispatch(new Auth.UpdateUser(action.payload.user.id))
      this.store.dispatch(new Ui.ActivateFooter())
      this.store.dispatch(new Ui.ActivateHeader())
      this.store.dispatch(new Ui.ActivateSidebar())
    }),
    tap((action: LoopbackAction) =>
      this.ui.alerts.notifySuccess({
        title: 'Log In Success',
        body: `You are logged in as ${action.payload.user.email}.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 3000)),
  )

  @Effect({ dispatch: false })
  protected loginFail$ = this.actions$.ofType(AccountActionTypes.LOGIN_FAIL).pipe(
    tap((action: LoopbackAction) =>
      this.ui.alerts.notifyError({
        title: 'Log In Failure',
        body: `${action.payload.message}`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 3000)),
  )

  @Effect({ dispatch: false })
  protected signupSuccess$ = this.actions$.ofType(AccountActionTypes.SIGNUP_SUCCESS).pipe(
    map((action: LoopbackAction) => {
      this.router.navigate(['auth'])
      this.ui.alerts.notifySuccess({
        title: 'Registration Success',
        body: `You have registered successfully as ${action.payload.email}.`,
      })
    }),
  )

  @Effect({ dispatch: false })
  protected signupFail$ = this.actions$.ofType(AccountActionTypes.SIGNUP_FAIL).pipe(
    map((action: LoopbackAction) =>
      this.ui.alerts.notifyError({
        title: action.payload.name,
        body: action.payload.message,
      }),
    ),
  )

  @Effect({ dispatch: false })
  protected logout$ = this.actions$.ofType(AccountActionTypes.LOGOUT).pipe(tap(() => new Ui.ActivateLoader()))

  @Effect({ dispatch: false })
  protected logoutSuccess$ = this.actions$.ofType(AccountActionTypes.LOGOUT_SUCCESS).pipe(
    tap((action: LoopbackAction) => this.router.navigate(['auth'])),
    tap((action: LoopbackAction) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 3000)),
  )

  @Effect({ dispatch: false })
  protected logoutFail$ = this.actions$.ofType(AccountActionTypes.LOGOUT_FAIL).pipe(
    tap((action: LoopbackAction) => this.router.navigate(['auth'])),
    tap((action: LoopbackAction) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 3000)),
  )

  @Effect()
  protected updateUser$ = this.actions$.ofType(AccountActionTypes.UPDATE_USER).pipe(
    mergeMap((action: LoopbackAction) =>
      this.userApi.findById(action.payload, { include: 'roles' }).pipe(
        map((response: any) => {
          this.auth.setUser(response)
          return new AccountActions.UpdateUserSuccess(response)
        }),
        catchError((error: any) => of(new AccountActions.UpdateUserFail(error))),
      ),
    ),
  )
}
