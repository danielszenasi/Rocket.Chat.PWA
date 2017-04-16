import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../environments/environment';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {combineReducers} from '@ngrx/store';

import * as fromLogin from './login/authentication';
import * as fromRooms from './room/rooms';
import * as fromRoomCollection from './room/room-collection';
import * as fromMessage from './message/message';
// import * as fromLayout from './layout';


export interface State {
  login: fromLogin.State;
  rooms: fromRooms.State;
  roomCollection: fromRoomCollection.State;
  // layout: fromLayout.State;
  router: fromRouter.RouterState;
  message: fromMessage.State;
}

const reducers = {
  login: fromLogin.reducer,
  rooms: fromRooms.reducer,
  roomCollection: fromRoomCollection.reducer,
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
export const getSelectedRoomId = createSelector(getRoomsState, fromRooms.getSelectedId);
export const getSelectedRoom = createSelector(getRoomsState, fromRooms.getSelected);


// export const getSearchState = (state: State) => state.search;
//
// export const getSearchBookIds = createSelector(getSearchState, fromSearch.getIds);
// export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
// export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);
//
//
// export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
//   return searchIds.map(id => books[id]);
// });


export const getRoomCollectionState = (state: State) => state.roomCollection;

export const getRoomCollectionLoaded = createSelector(getRoomCollectionState, fromRoomCollection.getLoaded);
export const getRoomCollectionLoading = createSelector(getRoomCollectionState, fromRoomCollection.getLoading);
export const getRoomCollectionRoomIds = createSelector(getRoomCollectionState, fromRoomCollection.getIds);

export const getRoomCollection = createSelector(getRoomEntities, getRoomCollectionRoomIds, (entities, ids) => {
  console.log(70, "index.ts", entities, ids);
  return ids.map(id => entities[id]);
});

export const isSelectedRoomInCollection = createSelector(getRoomCollectionRoomIds, getSelectedRoomId, (ids, selected) => {
  return ids.indexOf(selected) > -1;
});

export const getLoginState = (state: State) => state.login;

export const getLoginSuccess = createSelector(getLoginState, fromLogin.getLoginSucces);

export const getMessageState = (state: State) => state.message;

export const getLoadHistoryComplete = createSelector(getMessageState, fromMessage.getLoadHistoryComplete);

/**
 * Layout Reducers
 */
// export const getLayoutState = (state: State) => state.layout;

// export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
