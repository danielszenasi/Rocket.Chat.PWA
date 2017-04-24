import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DDPService} from '../ws/ddp.service';
import {DDPResponse} from '../../models/ddp-response.model';


@Injectable()
export class Authentication {

  constructor(private ddp: DDPService) {
    console.log('Hello Authentication Provider');
  }

  login(cred: any): Observable<DDPResponse> {
    return this.ddp.call('login', [cred]);
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
