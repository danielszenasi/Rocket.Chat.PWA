import {Message} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import {createSelector} from 'reselect';
import {LoadHistoryDTO} from "../../models/dto/load-history-dto.model";

export interface State {
  rids: string[];
  entities: { [rid: string]: Message[] };
  selectedRoomId: string | null;
}
;

export const initialState: State = {
  rids: [],
  entities: {},
  selectedRoomId: null,
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {
    case message.LOAD_HISTORY: {
      const loadHistoryDTO: LoadHistoryDTO = action.payload;
      return Object.assign({}, state, {
        loading: true,
        selectedRoomId: loadHistoryDTO.roomId
      });
    }

    case message.LOAD_HISTORY_COMPLETE: {
      const roomIdWithMessages = action.payload;
      return {
        rids: [...state.rids, roomIdWithMessages.rid],
        entities: Object.assign({}, state.entities, {
          [roomIdWithMessages.rid]: roomIdWithMessages.messages
        }),
        selectedRoomId: state.selectedRoomId
      };
    }


    default: {
      return state;
    }
  }
}

export const getEntites = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedRoomId;

export const getLoadHistoryComplete = createSelector(getEntites, getSelectedId, (entities, id) => entities[id]);
