import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as login from './actions/login/login';
import * as fromRoot from './reducers';


@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme = false;

  constructor(private store: Store<fromRoot.State>) {
  }

  onLogout() {
    this.store.dispatch(new login.LogoutAction());
  }
}
