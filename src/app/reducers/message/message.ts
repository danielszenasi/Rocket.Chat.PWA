import {Message} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {MessageWithId} from '../../models/message-with-id.model';
import {NewMessage} from '../../models/new-message.model';

export interface State {
  rids: string[];
  entities: { [rid: string]: { [_id: string]: Message } };
  ids: { [rid: string]: string[] }; // order is important
  loaded: boolean;
  loading: boolean;
  messagesState: { [id: string]: { [_id: string]: MessageState } };
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
      const loadHistoryDTO: LoadHistoryDTO = action.payload;
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case message.LOAD_COMPLETE:
    case message.LOAD_HISTORY_COMPLETE: {
      const messages: MessageWithId[] = action.payload;
      let roomEntities = state.entities;
      let roomIds = state.rids;
      let messageIds = state.ids;
      messages.forEach((messageWithRoomId: MessageWithId) => {

        let storedMessages = state.entities[messageWithRoomId.rid] ? state.entities[messageWithRoomId.rid] : {};
        let storedMessagIds = state.ids[messageWithRoomId.rid] ? state.ids[messageWithRoomId.rid] : [];


        const newMessages = storedMessages ?
          messageWithRoomId.messages.filter(message => !state.entities[message.rid]) :
          messageWithRoomId.messages;

        const newMessageIds = newMessages.reverse().map(message => message._id);
        const newMessageEntities = newMessages.reduce((entities: { [id: string]: Message }, message: Message) => {
          return Object.assign(entities, {
            [message._id]: message
          });
        }, {});

        storedMessages = Object.assign({}, storedMessages, newMessageEntities);
        storedMessagIds = [...storedMessagIds, ...newMessageIds];

        messageIds = Object.assign({}, messageIds, {[messageWithRoomId.rid]: storedMessagIds});
        roomEntities = Object.assign({}, roomEntities, {[messageWithRoomId.rid]: storedMessages});

        if (!state.entities[messageWithRoomId.rid]) {
          roomIds = [...roomIds, messageWithRoomId.rid];
        }
      });
      return {
        rids: [...state.rids, ...roomIds],
        ids: Object.assign({}, state.ids, messageIds),
        entities: Object.assign({}, state.entities, roomEntities),
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
    message.SEND_MESSAGE_COMPLETE: {
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
