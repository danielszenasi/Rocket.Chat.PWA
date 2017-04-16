import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {LoginUser} from '../../models/login-user.model';
import * as login from '../../actions/login/login';
import * as rooms from '../../actions/room/room';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  model = new LoginUser('', '');

  constructor(private store: Store<fromRoot.State>,
              private router: Router) {
    // this.models = null;

    const dispose = store.select(fromRoot.getLoginSuccess).subscribe(
      (user: LoginUser) => {
        if (user) {
          dispose.unsubscribe();
          this.router.navigate(['/room']);
        }

        // this.handleProgressDialog(currentState);

        // this.error = currentState.login.error;
      },
      error => {
        console.log(error);
      }
    );
  }

  // handleProgressDialog(_currentState) {
  //   if (_currentState.inProgress && this.loading === null) {
  //     this.loading = this.loadingCtrl.create({
  //       content: "Logging In User..."
  //     });
  //     this.loading.present()
  //   }
  //
  //
  //   if (!_currentState.inProgress && this.loading !== null) {
  //     this.loading && this.loading.dismiss();
  //     this.loading = null;
  //   }
  //
  // }

  loginClicked() {
    this.store.dispatch(new login.LoginAction(new LoginUser(this.model.username, this.model.password)));

  }
}
