import {Message} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {MessageWithId} from '../../models/message-with-id.model';
import {NewMessage} from '../../models/new-message.model';

export interface State {
  rids: string[];
  entities: { [_id: string]: Message };
  ids: { [rid: string]: string[] }; // order is important
  loaded: boolean;
  loading: boolean;
  messagesState: { [_id: string]: MessageState };
}
;

enum MessageState {
  Done,
  WaitForConnection,
  Sent,
}

export const initialState: State = {
  rids: [],
  entities: {},
  loaded: false,
  loading: false,
  messagesState: {},
  ids: {}
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {

    case message.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case message.LOAD_HISTORY: {
      // const loadHistoryDTO: LoadHistoryDTO = action.payload;
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case message.LOAD_SUCCESS:
    case message.LOAD_HISTORY_COMPLETE: {
      const messages: Message[] = action.payload;
      console.log(51, "message.ts", messages);
      const newMessages = messages.filter(message => !state.entities[message._id]);
      console.log(53, "message.ts", newMessages);
      const newMessageIds = newMessages.reduceRight((ids: { [rid: string]: string[] }, message: Message) => {
        const oldMessageIds = state.rids[message.rid] ? state.rids[message.rid] : [];
        const addedMessageIds = ids[message.rid] ? ids[message.rid] : [];

        return Object.assign(ids, {
          [message.rid]: [...oldMessageIds, ...addedMessageIds, message._id]
        });
      }, {});
      console.log(58, "message.ts", newMessageIds);

      const newMessageEntities = newMessages.reduce((entities: { [id: string]: Message }, message: Message) => {
        return Object.assign(entities, {
          [message._id]: message
        });
      }, {});

      const newRoomIds = Object.keys(newMessageIds).filter((rid: string) => !state.rids[rid]);

      return {
        rids: [...state.rids, ...newRoomIds],
        ids: Object.assign({}, state.ids, newMessageIds),
        entities: Object.assign({}, state.entities, newMessageEntities),
        loading: false,
        loaded: true,
        messagesState: state.messagesState
      };
    }

    case message.ADD_MESSAGE:
    case message.SEND_MESSAGE: {
      const message: NewMessage = action.payload;

      // TODO check messege room in the entities
      const storedMessages = Object.assign({}, state.entities[message.rid], {[message._id]: message});
      const storedMessagIds = [...state.ids[message.rid], message._id];

      const messagesState = Object.assign({}, state.messagesState[message.rid], {[message._id]: MessageState.Sent});

      return {
        rids: state.rids,
        ids: Object.assign({}, state.ids, {[message.rid]: storedMessagIds}),
        entities: Object.assign({}, state.entities, {[message.rid]: storedMessages}),
        loading: false,
        loaded: true,
        messagesState: Object.assign({}, state.messagesState, {[message.rid]: messagesState})
      };
    }
    case
    message.SEND_MESSAGE_SUCCESS: {
      return state;
    }
    case
    message.SEND_MESSAGE_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getRids = (state: State) => state.rids;
export const getEntites = (state: State) => state.entities;
