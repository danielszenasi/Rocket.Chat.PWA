import * as login from '../../actions/login/login';
import {LoginUser} from '../../models/login-user.model';


/**
 * Keeping Track of the AuthenticationState
 */
export interface State {
  inProgress: boolean;            // are we taking some network action
  isLoggedIn: boolean;            // is the user logged in or not
  tokenCheckComplete: boolean;    // have we checked for a persisted user token
  user: LoginUser;                   // current user | null
  error?: Object;                 // if an error occurred | null

}

/**
 * Setting the InitialState for this Reducer's Store
 */
const initialState = {
  inProgress: false,
  isLoggedIn: false,
  tokenCheckComplete: false,
  user: null
};

export function reducer(state = initialState, action: login.Actions): State {


  switch (action.type) {


    case login.LOGIN: {
      console.log(34, "authentication.ts", action.payload);
      return {
        inProgress: true,
        isLoggedIn: false,
        error: null,
        tokenCheckComplete: state.tokenCheckComplete,
        user: action.payload
      };

    }
    case login.LOGOUT: {
      return Object.assign({}, state, {inProgress: true, isLoggedIn: true});
    }

    case login.CHECK_AUTH_SUCCESS:
      state = Object.assign({}, state, {tokenCheckComplete: true});
    case login.LOGIN_SUCCESS: {
      console.log(44, "authentication.ts", action.payload);
      window.localStorage.setItem('AUTH_TOKEN', JSON.stringify(action.payload.token));
      return Object.assign({}, state, {inProgress: false, user: action.payload, isLoggedIn: true});
    }

    case login.CHECK_AUTH_FAILED:
      state = Object.assign({}, state, {tokenCheckComplete: true});
    case login.LOGIN_FAILED: {
      return Object.assign({}, state, {inProgress: false, error: action.payload, isLoggedIn: false});
    }


    case login.LOGOUT_FAILED: {
      return Object.assign({}, state, {inProgress: false, error: action.payload, isLoggedIn: true});
    }

    case login.CHECK_AUTH_SUCCESS_NO_USER:
      return Object.assign({}, initialState, {tokenCheckComplete: true});

    case login.LOGOUT_SUCCESS: {
      return Object.assign({}, initialState);
    }

    case login.CHECK_AUTH: {
      return Object.assign({}, state, {inProgress: true, isLoggedIn: false, tokenCheckComplete: false});
    }

    default:
      return state;
  }
}

export const getLoginSucces = (state: State) => state.user;

