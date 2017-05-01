import {createSelector} from 'reselect';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export interface State {
  ids: string[];
  entities: { [name: string]: RoomSubscription };
  selectedRoomName: string | null;
  loaded: boolean;
  loading: boolean;
}
;

export const initialState: State = {
  ids: [],
  entities: {},
  selectedRoomName: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: room.Actions): State {
  switch (action.type) {

    case room.GET_COMPLETE:
    case room.LOAD_SUCCESS: {
      const rooms = action.payload;
      const newRooms = rooms.filter(room => !state.entities[room.name]);
      const newRoomIds = newRooms.map(room => room.name);
      const newRoomEntities = newRooms.reduce((entities: { [name: string]: RoomSubscription }, room: RoomSubscription) => {
        return Object.assign(entities, {
          [room.name]: room
        });
      }, {});

      return {
        ids: [...state.ids, ...newRoomIds],
        entities: Object.assign({}, state.entities, newRoomEntities),
        selectedRoomName: state.selectedRoomName,
        loading: false,
        loaded: true
      };
    }

    case room.SELECT: {
      const name = action.payload;
      return {
        ids: state.ids,
        entities: state.entities,
        selectedRoomName: name,
        loading: state.loading,
        loaded: state.loaded
      };
    }

    case room.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case room.REMOVE_ROOM_FAIL: {
      const roomSubscription = action.payload;

      if (state.ids.indexOf(roomSubscription.name) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, roomSubscription.name]
      });
    }

    case room.REMOVE_ROOM_SUCCESS: {
      const roomSubscription = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== roomSubscription.name)
      });
    }

    default: {
      return state;
    }
  }
}


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedRoomName;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => entities[selectedId]);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));

