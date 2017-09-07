/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import { AccountActionTypes, AccountActions } from '../actions/Account';
import { LoopbackErrorActions } from '../actions/error';
import { AccountApi } from '../services/index';

@Injectable()
export class AccountEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdAccessTokens(action.payload.id, action.payload.fk)
        .mergeMap((response: any) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'AccessToken', 'findByIdSuccess'),
          of(new AccountActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.findByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public destroyByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdAccessTokens(action.payload.id, action.payload.fk)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'AccessToken', 'deleteByIdSuccess'),
          of(new AccountActions.destroyByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.destroyByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public updateByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'AccessToken', 'findByIdSuccess'),
          of(new AccountActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.updateByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public findByIdRoles$ = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdRoles(action.payload.id, action.payload.fk)
        .mergeMap((response: any) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Role', 'findByIdSuccess'),
          of(new AccountActions.findByIdRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.findByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public destroyByIdRoles$ = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdRoles(action.payload.id, action.payload.fk)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'Role', 'deleteByIdSuccess'),
          of(new AccountActions.destroyByIdRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.destroyByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public updateByIdRoles$ = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdRoles(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Role', 'findByIdSuccess'),
          of(new AccountActions.updateByIdRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.updateByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public linkRoles$ = this.actions$
    .ofType(AccountActionTypes.LINK_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.linkRoles(action.payload.id, action.payload.fk, action.payload.data)
        .map((response: any) => new AccountActions.linkRolesSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.linkRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public unlinkRoles$ = this.actions$
    .ofType(AccountActionTypes.UNLINK_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.unlinkRoles(action.payload.id, action.payload.fk)
        .map((response: any) => new AccountActions.unlinkRolesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.unlinkRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public getAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.GET_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.getAccessTokens(action.payload.id, action.payload.filter)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
          of(new AccountActions.getAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.getAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public createAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.CREATE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createAccessTokens(action.payload.id, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
          of(new AccountActions.createAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.createAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public deleteAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.DELETE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteAccessTokens(action.payload.id)
        .map((response: any) => new AccountActions.deleteAccessTokensSuccess(action.payload, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.deleteAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public getRoles$ = this.actions$
    .ofType(AccountActionTypes.GET_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.getRoles(action.payload.id, action.payload.filter)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
          of(new AccountActions.getRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.getRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public createRoles$ = this.actions$
    .ofType(AccountActionTypes.CREATE_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.createRoles(action.payload.id, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
          of(new AccountActions.createRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.createRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public deleteRoles$ = this.actions$
    .ofType(AccountActionTypes.DELETE_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteRoles(action.payload.id)
        .map((response: any) => new AccountActions.deleteRolesSuccess(action.payload, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.deleteRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public login$ = this.actions$
    .ofType(AccountActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.account.login(action.payload.credentials, action.payload.include)
        .map((response: any) => new AccountActions.loginSuccess(response, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public logout$ = this.actions$
    .ofType(AccountActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.account.logout()
        .map((response: any) => new AccountActions.logoutSuccess(action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.logoutFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public verify$ = this.actions$
    .ofType(AccountActionTypes.VERIFY)
    .mergeMap((action: LoopbackAction) =>
      this.account.verify(action.payload.id)
        .map((response: any) => new AccountActions.verifySuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.verifyFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public confirm$ = this.actions$
    .ofType(AccountActionTypes.CONFIRM)
    .mergeMap((action: LoopbackAction) =>
      this.account.confirm(action.payload.uid, action.payload.token, action.payload.redirect)
        .map((response: any) => new AccountActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.confirmFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public resetPassword$ = this.actions$
    .ofType(AccountActionTypes.RESET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.resetPassword(action.payload.options)
        .map((response: any) => new AccountActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.resetPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public changePassword$ = this.actions$
    .ofType(AccountActionTypes.CHANGE_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.changePassword(action.payload.oldPassword, action.payload.newPassword)
        .map((response: any) => new AccountActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.changePasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public setPassword$ = this.actions$
    .ofType(AccountActionTypes.SET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.setPassword(action.payload.newPassword)
        .map((response: any) => new AccountActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.setPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public createManyAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyAccessTokens(action.payload.id, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
          of(new AccountActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.createManyAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public createManyRoles$ = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyRoles(action.payload.id, action.payload.data)
        .mergeMap((response: any) => concat(
          resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
          of(new AccountActions.createManyRolesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error: any) => concat(
          of(new AccountActions.createManyRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
  @Effect()
  public signup$ = this.actions$
    .ofType(AccountActionTypes.SIGNUP)
    .mergeMap((action: LoopbackAction) =>
      this.account.create(action.payload)
        .map((response: any) => new AccountActions.signupSuccess(action.payload, response, action.meta))
        .catch((error: any) => concat(
          of(new AccountActions.signupFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );
    
    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(AccountApi) public account: AccountApi
  ) {
    super(actions$, account, 'Account', AccountActionTypes, AccountActions);
  }
}
