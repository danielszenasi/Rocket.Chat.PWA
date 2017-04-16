import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as sha256 from 'js-sha256';

import {LoginUser} from '../../models/login-user.model';
import {RCDDPClient} from '../api/rc-ddp-client';


@Injectable()
export class Authentication {

  constructor(private ddp: RCDDPClient) {
    console.log('Hello Authentication Provider');
  }

  login(usernameWithPass: LoginUser) {
    return this.ddp.rpc('login', [{
      user: {
        email: usernameWithPass.username
      },
      password: {
        digest: sha256(usernameWithPass.password),
        algorithm: 'sha-256'
      }
    }]);
  }


  logout() {
    return new Observable(observer => {
      setTimeout(() => {
        window.localStorage.removeItem('AUTH_TOKEN');

        return observer.next({});
      }, 2000);
    });
  }

  checkAuth() {
    return new Observable(observer => {
      setTimeout(() => {
        const token = window.localStorage.getItem('AUTH_TOKEN');
        if (token) {
          return observer.next(JSON.parse(token));
        } else {
          return observer.next(null);
        }
      }, 1000);
    });
  }

}
