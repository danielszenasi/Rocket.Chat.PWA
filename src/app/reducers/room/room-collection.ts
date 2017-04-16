import * as roomCollection from '../../actions/room/room-collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: roomCollection.Actions): State {
  switch (action.type) {
    case roomCollection.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case roomCollection.LOAD_SUCCESS: {
      const rooms = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: rooms.map(roomSubscription => roomSubscription.rid)
      };
    }

    case roomCollection.ADD_ROOM_SUCCESS:
    case roomCollection.REMOVE_ROOM_FAIL: {
      const roomSubscription = action.payload;

      if (state.ids.indexOf(roomSubscription.rid) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, roomSubscription.rid ]
      });
    }

    case roomCollection.REMOVE_ROOM_SUCCESS:
    case roomCollection.ADD_ROOM_FAIL: {
      const roomSubscription = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== roomSubscription.rid)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
