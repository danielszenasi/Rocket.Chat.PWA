import {Message} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {MessageWithId} from '../../models/message-with-id.model';

export interface State {
  rids: string[];
  entities: { [rid: string]: Message[] };
  loaded: boolean;
  loading: boolean;
}
;

export const initialState: State = {
  rids: [],
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {

    case message.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case message.LOAD_HISTORY: {
      const loadHistoryDTO: LoadHistoryDTO = action.payload;
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case message.LOAD_HISTORY_COMPLETE: {
      const messageWithRoomId: MessageWithId = action.payload;
      return {
        rids: state.rids,
        entities: Object.assign({}, state.entities, {[messageWithRoomId.rid]: messageWithRoomId.messages}),
        loading: false,
        loaded: state.loaded
      };

    }


    default: {
      return state;
    }
  }
}

export const getEntites = (state: State) => state.entities;
