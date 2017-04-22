import {createSelector} from 'reselect';
import * as room from '../../actions/room/room';
import * as collection from '../../actions/room/room-collection';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export interface State {
  ids: string[];
  entities: { [id: string]: RoomSubscription };
  selectedRoomId: string | null;
}
;

export const initialState: State = {
  ids: [],
  entities: {},
  selectedRoomId: null,
};

export function reducer(state = initialState, action: room.Actions | collection.Actions): State {
  switch (action.type) {
    case room.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
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
        selectedRoomId: state.selectedRoomId
      };
    }

    case room.LOAD: {
      const room = action.payload;

      if (state.ids.indexOf(room.rid) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, room.rid],
        entities: Object.assign({}, state.entities, {
          [room.rid]: room
        }),
        selectedRoomId: state.selectedRoomId
      };
    }

    case room.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedRoomId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedRoomId;


export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => entities[selectedId]);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]));
