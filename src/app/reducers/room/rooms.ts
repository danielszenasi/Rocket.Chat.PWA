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
      console.log(24, "rooms.ts", 'load-s');
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
      console.log(41, "rooms.ts", 'load');
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
      console.log(57, "rooms.ts", action.payload);
      console.log(58, "rooms.ts", state.selectedRoomId);
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

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => {
  console.log(82, "rooms.ts", state);
  return state.entities;
}

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => {
  console.log(89, "rooms.ts", state);
  return state.selectedRoomId;
}

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  console.log(86, "rooms.ts", selectedId);
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  console.log(99, "rooms.ts", ids);
  return ids.map(id => entities[id]);
});