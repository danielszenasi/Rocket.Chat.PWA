import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as login from '../../actions/login/login';
import * as room from '../../actions/room/room';
import {Authentication} from '../../services/login/authentication';
import {from} from 'rxjs/observable/from';
import {of} from "rxjs/observable/of";


@Injectable()
export class AuthenticationEffects {

  @Effect() login$ = this.actions$
    .ofType(login.LOGIN)
    .switchMap(action => this.auth.login(action.payload)
      .mergeMap((res: any) => from([new login.LoginSuccessAction(res), new room.GetAction()]))
      .catch((_error) => Observable.of(new login.LoginFailedAction(_error)))
    );

  @Effect() logout$ = this.actions$
    .ofType(login.LOGOUT)
    .switchMap(action => this.auth.logout()
        .map((res: any) => ({type: login.LOGOUT_SUCCESS, payload: res}))
    );


  @Effect() checkAuth$ = this.actions$
    .ofType(login.CHECK_AUTH)
    .switchMap(action => this.auth.checkAuth()
        .map((res: any) => {
      console.log(30, "authentication.ts", res);
          if (res !== null) {
            return {type: login.CHECK_AUTH_SUCCESS, payload: res};
          } else {
            return {type: login.CHECK_AUTH_SUCCESS_NO_USER};
          }
        }).catch((err) => of(new login.CheckAuthFailedAction(err)))
    );

  constructor(private auth: Authentication,
              private actions$: Actions) {
  }
}
