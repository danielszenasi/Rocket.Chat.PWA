import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as login from '../../actions/login/login';
import {Authentication} from '../../services/login/authentication';

@Injectable()
export class AuthenticationEffects {

  @Effect() login$ = this.actions$
  // Listen for the 'LOGIN' action
    .ofType(login.LOGIN)
    .switchMap(action => this.auth.login(action.payload)
      // If successful, dispatch success action with result
        .map((res: any) => ({type: login.LOGIN_SUCCESS, payload: res}))
        // If request fails, dispatch failed action
        .catch((_error) => Observable.of({type: login.LOGIN_FAILED, payload: _error}))
    );

  @Effect() logout$ = this.actions$
  // Listen for the 'LOGOUT' action
    .ofType(login.LOGOUT)
    .switchMap(action => this.auth.logout()
      // If successful, dispatch success action with result
        .map((res: any) => ({type: login.LOGOUT_SUCCESS, payload: res}))
    );


  @Effect() checkAuth$ = this.actions$
  // Listen for the 'LOGOUT' action
    .ofType(login.CHECK_AUTH)
    .switchMap(action => this.auth.checkAuth()
      // If successful, dispatch success action with result
        .map((res: any) => {
          if (res !== null) {
            return {type: login.CHECK_AUTH_SUCCESS, payload: res};
          } else {
            return {type: login.CHECK_AUTH_SUCCESS_NO_USER};
          }
        })
    );

  constructor(private auth: Authentication,
              private actions$: Actions) {
  }
}
