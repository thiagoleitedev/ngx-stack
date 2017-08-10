import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { concat } from 'rxjs/observable/concat'
import { Effect, Actions } from '@ngrx/effects'
import { Store, Action } from '@ngrx/store'
import { ACL, ACLApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/startWith'

import * as Control from '../actions/control.actions'

@Injectable()
export class ControlEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private controlApi: ACLApi,
    private ui: NgxUiService,
  ) { }

  @Effect()
  protected createControl: Observable<Action> = this.actions$
    .ofType(Control.CREATE_CONTROL)
    .mergeMap((action: Control.CreateControl) => this.controlApi.create(action.payload)
      .map((response: ACL) => new Control.CreateControlSuccess(response))
      .catch((error: any) => of(new Control.CreateControlFail(error))))

  @Effect({ dispatch: false })
  protected createControlSuccess = this.actions$
    .ofType(Control.CREATE_CONTROL_SUCCESS)
    .map((action: Control.CreateControlSuccess) => this.ui.toastSuccess('Create Control Success', `The control for the <u><i>${action.payload.model}</i></u> model has been created successfully.`))

  @Effect({ dispatch: false })
  protected createControlFail = this.actions$
    .ofType(Control.CREATE_CONTROL_FAIL)
    .map((action: Control.CreateControlFail) => this.ui.toastError('Create Control Fail', `${action.payload.message}`))

  @Effect()
  protected readControls: Observable<Action> = this.actions$
    .ofType(Control.READ_CONTROLS)
    .mergeMap((action: Control.ReadControls) => this.controlApi.find(action.payload)
      .map((response: Array<ACL>) => new Control.ReadControlsSuccess(response))
      .catch((error: any) => of(new Control.ReadControlsFail(error))))

  @Effect()
  protected updateControl: Observable<Action> = this.actions$
    .ofType(Control.UPDATE_CONTROL)
    .mergeMap((action: Control.UpdateControl) => this.controlApi.patchAttributes(action.payload.id, action.payload)
      .map((response: ACL) => new Control.UpdateControlSuccess(action.payload))
      .catch((error: any) => of(new Control.UpdateControlFail(error))))

  @Effect({ dispatch: false })
  protected updateControlSuccess = this.actions$
    .ofType(Control.UPDATE_CONTROL_SUCCESS)
    .map((action: Control.UpdateControlSuccess) => this.ui.toastSuccess('Update Control Success', `The control for the <u><i>${action.payload.model}</i></u> model has been updated successfully.`))

  @Effect({ dispatch: false })
  protected updateControlFail = this.actions$
    .ofType(Control.UPDATE_CONTROL_FAIL)
    .map((action: Control.UpdateControlFail) => this.ui.toastError('Update Control Fail', `${action.payload.message}`))

  @Effect()
  protected deleteControl: Observable<Action> = this.actions$
    .ofType(Control.DELETE_CONTROL)
    .mergeMap((action: Control.DeleteControl) => this.controlApi.deleteById(action.payload.id)
      .map((response: ACL) => new Control.DeleteControlSuccess(action.payload))
      .catch((error: any) => of(new Control.DeleteControlFail(error))))

  @Effect({ dispatch: false })
  protected deleteControlSuccess = this.actions$
    .ofType(Control.DELETE_CONTROL_SUCCESS)
    .map((action: Control.DeleteControlSuccess) => this.ui.toastSuccess('Delete Control Success', `The control for the <u><i>${action.payload.model}</i></u> model has been deleted successfully.`))

  @Effect({ dispatch: false })
  protected deleteControlFail = this.actions$
    .ofType(Control.DELETE_CONTROL_FAIL)
    .map((action: Control.DeleteControlFail) => this.ui.toastError('Delete Control Fail', `${action.payload.message}`))

}
