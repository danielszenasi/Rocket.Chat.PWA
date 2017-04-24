import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../environments/environment';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {combineReducers} from '@ngrx/store';

import * as fromLogin from './login/authentication';
import * as fromRooms from './room/rooms';
import * as fromMessage from './message/message';
// import * as fromLayout from './layout';


export interface State {
  login: fromLogin.State;
  rooms: fromRooms.State;
  // layout: fromLayout.State;
  router: fromRouter.RouterState;
  message: fromMessage.State;
}

const reducers = {
  login: fromLogin.reducer,
  rooms: fromRooms.reducer,
  // layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
  message: fromMessage.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getRoomsState = (state: State) => state.rooms;


export const getRoomEntities = createSelector(getRoomsState, fromRooms.getEntities);
export const getRoomIds = createSelector(getRoomsState, fromRooms.getIds);
export const getRoomLoaded = createSelector(getRoomsState, fromRooms.getLoaded);
export const getRoomLoading = createSelector(getRoomsState, fromRooms.getLoading);
export const getSelectedRoomId = createSelector(getRoomsState, fromRooms.getSelectedId);
export const getSelectedRoom = createSelector(getRoomsState, fromRooms.getSelected);
export const getRooms = createSelector(getRoomEntities, getRoomIds, (entities, ids) => ids.map(id => entities[id]));


export const getLoginState = (state: State) => state.login;

export const getLoginSuccess = createSelector(getLoginState, fromLogin.getLoginSucces);

export const getMessageState = (state: State) => state.message;
export const getMessageEntities = createSelector(getMessageState, fromMessage.getEntites);
export const getMessageIds = createSelector(getMessageState, fromMessage.getIds);

export const getMessages = createSelector(getMessageEntities, getSelectedRoomId, (entities, id) => entities[id]);
export const getMessageId = createSelector(getMessageIds, getSelectedRoomId, (ids, id) => ids[id]);

export const getLoadHistoryComplete = createSelector(getMessages, getMessageId, (entities, ids) => {
  if (ids) {
    const res =  ids.map(id => entities[id]);
    return res;
  }
  return [];
});


/**
 * Layout Reducers
 */
// export const getLayoutState = (state: State) => state.layout;

// export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
