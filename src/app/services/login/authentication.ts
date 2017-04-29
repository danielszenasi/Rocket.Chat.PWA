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
    window.localStorage.removeItem('AUTH_TOKEN');
    return this.ddp.call('logout', []);
  }

  checkAuth() {
    const token = window.localStorage.getItem('AUTH_TOKEN');
    return this.ddp.call('login', [{resume: token}]);
  }

  hasToken(): string {
    return window.localStorage.getItem('AUTH_TOKEN');
  }

}
