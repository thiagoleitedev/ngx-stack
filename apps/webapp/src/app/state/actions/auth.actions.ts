import { Action } from '@ngrx/store'
import { SDKToken } from '@ngx-plus/ngx-sdk'

export const LOG_IN = '[Auth] LogIn'
export const LOG_IN_SUCCESS = '[Auth] LogIn Success'
export const LOG_IN_FAIL = '[Auth] LogIn Fail'

export const LOG_OUT = '[Auth] LogOut'
export const LOG_OUT_SUCCESS = '[Auth] LogOut Success'
export const LOG_OUT_FAIL = '[Auth] LogOut Fail'

export const PW_REQUEST = '[Auth] PWRequest'
export const PW_REQUEST_SUCCESS = '[Auth] PWRequest Success'
export const PW_REQUEST_FAIL = '[Auth] PWRequest Fail'

export const PW_VERIFY = '[Auth] PWVerify'
export const PW_VERIFY_SUCCESS = '[Auth] PWVerify Success'
export const PW_VERIFY_FAIL = '[Auth] PWVerify Fail'

export const REGISTER = '[Auth] Register'
export const REGISTER_SUCCESS = '[Auth] Register Success'
export const REGISTER_FAIL = '[Auth] Register Fail'

export const CHECK_TOKEN = '[Auth] CheckToken'
export const CHECK_TOKEN_SUCCESS = '[Auth] CheckToken Success'
export const CHECK_TOKEN_FAIL = '[Auth] CheckToken Fail'

export const LOAD_TOKEN = '[Auth] LoadToken'
export const LOAD_TOKEN_SUCCESS = '[Auth] LoadToken Success'
export const LOAD_TOKEN_FAIL = '[Auth] LoadToken Fail'

type credentials = {
  email: string,
  password: string,
}

/** LOG_IN **/
export class LogIn implements Action {
  public readonly type = LOG_IN
  constructor(public payload: credentials) { }
}

export class LogInSuccess implements Action {
  public readonly type = LOG_IN_SUCCESS
  constructor(public payload: any) { }
}

export class LogInFail implements Action {
  public readonly type = LOG_IN_FAIL
  constructor(public payload: any) { }
}

/** LOG_OUT **/
export class LogOut implements Action {
  public readonly type = LOG_OUT
  constructor(public payload: any) { }
}

export class LogOutSuccess implements Action {
  public readonly type = LOG_OUT_SUCCESS
  constructor(public payload: any) { }
}

export class LogOutFail implements Action {
  public readonly type = LOG_OUT_FAIL
  constructor(public payload: any) { }
}

/** PASS_REQUEST **/
export class PWRequest implements Action {
  public readonly type = PW_REQUEST
  constructor(public payload: any) { }
}

export class PWRequestSuccess implements Action {
  public readonly type = PW_REQUEST_SUCCESS
  constructor(public payload: any) { }
}

export class PWRequestFail implements Action {
  public readonly type = PW_REQUEST_FAIL
  constructor(public payload: any) { }
}

/** PASS_VERIFY **/
export class PWVerify implements Action {
  public readonly type = PW_VERIFY
  constructor(public payload: any) { }
}

export class PWVerifySuccess implements Action {
  public readonly type = PW_VERIFY_SUCCESS
  constructor(public payload: any) { }
}

export class PWVerifyFail implements Action {
  public readonly type = PW_VERIFY_FAIL
  constructor(public payload: any) { }
}

/** REGISTER **/
export class Register implements Action {
  public readonly type = REGISTER
  constructor(public payload: any) { }
}

export class RegisterSuccess implements Action {
  public readonly type = REGISTER_SUCCESS
  constructor(public payload: any) { }
}

export class RegisterFail implements Action {
  public readonly type = REGISTER_FAIL
  constructor(public payload: any) { }
}

/** CHECK_TOKEN **/
export class CheckToken implements Action {
  public readonly type = CHECK_TOKEN
  constructor(public payload: any) { }
}

export class CheckTokenSuccess implements Action {
  public readonly type = CHECK_TOKEN_SUCCESS
  constructor(public payload: any) { }
}

export class CheckTokenFail implements Action {
  public readonly type = CHECK_TOKEN_FAIL
  constructor(public payload: any) { }
}

/** LOAD_TOKEN **/
export class LoadToken implements Action {
  public readonly type = LOAD_TOKEN
}

export class LoadTokenSuccess implements Action {
  public readonly type = LOAD_TOKEN_SUCCESS
  constructor(public payload: SDKToken) { }
}

export class LoadTokenFail implements Action {
  public readonly type = LOAD_TOKEN_FAIL
  constructor(public payload: any) { }
}

export type Actions =
  | LogIn
  | LogInSuccess
  | LogInFail
  | LogOut
  | LogOutSuccess
  | LogOutFail
  | PWRequest
  | PWRequestSuccess
  | PWRequestFail
  | PWVerify
  | PWVerifySuccess
  | PWVerifyFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | CheckToken
  | CheckTokenSuccess
  | CheckTokenFail
  | LoadToken
  | LoadTokenSuccess
  | LoadTokenFail
