import {createSelector} from 'reselect';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export interface State {
  ids: string[];
  entities: { [id: string]: RoomSubscription };
  selectedRoomId: string | null;
  loaded: boolean;
  loading: boolean;
}
;

export const initialState: State = {
  ids: [],
  entities: {},
  selectedRoomId: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: room.Actions): State {
  switch (action.type) {

    case room.GET_COMPLETE:
    case room.LOAD_SUCCESS: {
      const rooms = action.payload;
      const newRooms = rooms.filter(room => !state.entities[room.rid]);
      const newRoomIds = newRooms.map(room => room.rid);
      const newRoomEntities = newRooms.reduce((entities: { [id: string]: RoomSubscription }, room: RoomSubscription) => {
        return Object.assign(entities, {
          [room.rid]: room
        });
      }, {});

      return {
        ids: [...state.ids, ...newRoomIds],
        entities: Object.assign({}, state.entities, newRoomEntities),
        selectedRoomId: state.selectedRoomId,
        loading: false,
        loaded: true
      };
    }

    case room.SELECT: {
      const roomSubscription = action.payload;
      return {
        ids: state.ids,
        entities: state.entities,
        selectedRoomId: roomSubscription.rid,
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

      if (state.ids.indexOf(roomSubscription.rid) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, roomSubscription.rid]
      });
    }

    case room.REMOVE_ROOM_SUCCESS: {
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


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedRoomId;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => entities[selectedId]);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));

