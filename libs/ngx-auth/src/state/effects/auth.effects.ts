import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { defer } from 'rxjs/observable/defer'
import { of } from 'rxjs/observable/of'
import { catchError, tap, map, mergeMap, startWith } from 'rxjs/operators'

import { NgxUiService, NgxUiActions } from '@ngx-plus/ngx-ui'
import { AccountApi, LoopBackAuth } from '@ngx-plus/ngx-sdk'

import * as Auth from '../actions/auth.actions'

@Injectable()
export class NgxAuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: AccountApi,
    private ui: NgxUiService,
    private auth: LoopBackAuth,
    private router: Router,
  ) {}

  @Effect()
  protected checkToken$ = this.actions$.ofType(Auth.CHECK_TOKEN).pipe(
    startWith(new Auth.CheckToken()),
    tap(() => new NgxUiActions.ActivateLoader()),
    map((action: Auth.CheckToken) => {
      const token = this.auth.getToken()
      if (!token.userId) {
        return new Auth.CheckTokenFail(token)
      }
      return new Auth.CheckTokenSuccess(token)
    }),
  )

  @Effect({ dispatch: false })
  protected checkTokenSuccess$ = this.actions$.ofType(Auth.CHECK_TOKEN_SUCCESS).pipe(
    tap((action: Auth.CheckTokenSuccess) => {
      this.ui.alerts.notifySuccess({
        title: 'Valid Token',
        body: `Your access token has been validated.`,
      })
    }),
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

  @Effect()
  protected logIn$ = this.actions$.ofType(Auth.LOG_IN).pipe(
    tap(() => this.store.dispatch(new NgxUiActions.ActivateLoader())),
    mergeMap((action: Auth.LogIn) =>
      this.userApi
        .login(action.payload, 'user', true)
        .map((response: any) => new Auth.LogInSuccess(response))
        .catch((error: any) => of(new Auth.LogInFail(error))),
    ),
  )

  @Effect({ dispatch: false })
  protected logInSuccess$ = this.actions$.ofType(Auth.LOG_IN_SUCCESS).pipe(
    tap((action: Auth.LogInSuccess) => this.router.navigate(['dashboard'])),
    tap((action: Auth.LogInSuccess) => {
      this.store.dispatch(new Auth.UpdateUser(action.payload.user.id))
      this.store.dispatch(new NgxUiActions.ActivateFooter())
      this.store.dispatch(new NgxUiActions.ActivateHeader())
      this.store.dispatch(new NgxUiActions.ActivateSidebar())
    }),
    tap((action: Auth.LogInSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Log In Success',
        body: `You are logged in as ${action.payload.user.email}.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new NgxUiActions.DeactivateLoader()), 2000)),
  )

  @Effect({ dispatch: false })
  protected logInFail$ = this.actions$.ofType(Auth.LOG_IN_FAIL).pipe(
    tap((action: Auth.LogInFail) =>
      this.ui.alerts.notifyError({
        title: 'Log In Failure',
        body: `${action.payload.message}`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new NgxUiActions.DeactivateLoader()), 2000)),
  )

  @Effect()
  protected register$ = this.actions$
    .ofType(Auth.REGISTER)
    .pipe(
      mergeMap((action: Auth.Register) =>
        this.userApi
          .create(action.payload)
          .pipe(
            map((response: any) => new Auth.RegisterSuccess(response)),
            catchError((error: any) => of(new Auth.RegisterFail(error))),
          ),
      ),
    )

  @Effect({ dispatch: false })
  protected registerSuccess$ = this.actions$.ofType(Auth.REGISTER_SUCCESS).pipe(
    map((action: Auth.RegisterSuccess) => {
      this.router.navigate(['auth'])
      this.ui.alerts.notifySuccess({
        title: 'Registration Success',
        body: `You have registered successfully as ${action.payload.email}.`,
      })
    }),
  )

  @Effect({ dispatch: false })
  protected registerFail$ = this.actions$.ofType(Auth.REGISTER_FAIL).pipe(
    map((action: Auth.RegisterFail) =>
      this.ui.alerts.notifyError({
        title: action.payload.name,
        body: action.payload.message,
      }),
    ),
  )

  @Effect()
  protected logOut$ = this.actions$
    .ofType(Auth.LOG_OUT)
    .pipe(
      tap(() => this.store.dispatch(new NgxUiActions.ActivateLoader())),
      mergeMap((action: Auth.LogOut) =>
        this.userApi
          .logout()
          .pipe(
            map((response: any) => new Auth.LogOutSuccess(response)),
            catchError((error: any) => of(new Auth.LogOutFail(error))),
          ),
      ),
    )

  @Effect({ dispatch: false })
  protected logOutSuccess$ = this.actions$.ofType(Auth.LOG_OUT_SUCCESS).pipe(
    tap((action: Auth.LogOutSuccess) => this.router.navigate(['auth'])),
    tap((action: Auth.LogOutSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new NgxUiActions.DeactivateLoader()), 2000)),
  )

  @Effect({ dispatch: false })
  protected logOutFail$ = this.actions$.ofType(Auth.LOG_OUT_FAIL).pipe(
    tap((action: Auth.LogOutFail) => this.router.navigate(['auth'])),
    tap((action: Auth.LogOutFail) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    ),
    tap(() => setTimeout(() => this.store.dispatch(new NgxUiActions.DeactivateLoader()), 2000)),
  )

  @Effect()
  protected updateUser$ = this.actions$.ofType(Auth.UPDATE_USER).pipe(
    mergeMap((action: Auth.UpdateUser) =>
      this.userApi.findById(action.payload, { include: 'roles' }).pipe(
        map((response: any) => {
          this.auth.setUser(response)
          const roles = response.roles
          const isAdmin = roles.map(role => role.name).includes('Admin')
          return new Auth.UpdateUserSuccess(response)
        }),
        catchError((error: any) => of(new Auth.UpdateUserFail(error))),
      ),
    ),
  )
}
