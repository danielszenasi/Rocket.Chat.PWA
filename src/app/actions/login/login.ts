import {Action} from '@ngrx/store';
import {LoginUser} from '../../models/login-user.model';


export const LOGIN =                      '[LOGIN] Login';
export const LOGOUT =                     '[LOGIN] logout';
export const LOGIN_SUCCESS =              '[LOGIN] Login success';
export const LOGIN_FAILED =               '[LOGIN] Login failes';
export const CHECK_AUTH =                 '[LOGIN] Check auth';
export const LOGOUT_SUCCESS =             '[LOGIN] Logout success';
export const LOGOUT_FAILED =              '[LOGIN] Logout failed';
export const CHECK_AUTH_SUCCESS =         '[LOGIN] Check auth success';
export const CHECK_AUTH_FAILED =          '[LOGIN] check auth failed';
export const CHECK_AUTH_SUCCESS_NO_USER = '[LOGIN] check auth success no user';


export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor(public payload: string) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAILED;

  constructor(public payload: any) {
  }
}

export class CheckAuthAction implements Action {
  readonly type = CHECK_AUTH;

  constructor(public payload: any) {
  }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LogoutFailedAction implements Action {
  readonly type = LOGOUT_FAILED;

  constructor(public payload: any) {
  }
}

export class CheckAuthSuccessAction implements Action {
  readonly type = CHECK_AUTH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class CheckAuthFailedAction implements Action {
  readonly type = CHECK_AUTH_FAILED;

  constructor(public payload: any) {
  }
}

export class CheckAuthSuccessNoUserAction implements Action {
  readonly type = CHECK_AUTH_SUCCESS_NO_USER;

  constructor(public payload: string) {
  }
}

export type Actions
  = LoginAction
  | LogoutAction
  | LoginSuccessAction
  | LoginFailedAction
  | CheckAuthAction
  | LogoutSuccessAction
  | LogoutFailedAction
  | CheckAuthSuccessAction
  | CheckAuthFailedAction
  | CheckAuthSuccessNoUserAction;
