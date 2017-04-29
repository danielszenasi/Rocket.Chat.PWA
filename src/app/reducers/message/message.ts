import {Message} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import * as room from '../../actions/room/room';
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

export function reducer(state = initialState, action: message.Actions | room.Actions): State {
  switch (action.type) {

    case message.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case room.SELECT: {
      // const loadHistoryDTO: LoadHistoryDTO = action.payload;
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case message.LOAD_SUCCESS: {
      const messages: Message[] = action.payload;
      const newState = addMessages(state, messages, true);
      return newState;
    }

    case room.SELECT_COMPLETE: {
      const messages: Message[] = action.payload;
      const newState = addMessages(state, messages, false);
      return newState;
    }

    case message.ADD_MESSAGE:
    case message.SEND_MESSAGE: {
      const message: NewMessage = action.payload;

      if (!state.entities[message._id]) {
        const messagesState = Object.assign({}, state.messagesState[message.rid], {[message._id]: MessageState.Sent});
        return {
          rids: state.rids,
          ids: Object.assign({}, state.ids, {[message.rid]: [...state.ids[message.rid], message._id]}),
          entities: Object.assign({}, state.entities, {[message._id]: message}),
          loading: false,
          loaded: true,
          messagesState: Object.assign({}, state.messagesState, {[message.rid]: messagesState})
        };
      } else {
        return state;
      }

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

function addMessages(state: State, messages: Message[], needSort: boolean): State {
  const newMessages = messages.filter(message => !state.entities[message._id]);

  if (needSort) {
    newMessages.sort((a: Message, b: Message) => {
      const adate = new Date(a.ts);
      const bdate = new Date(b.ts);
      if (adate < bdate) {
        return 1;
      } else if (adate > bdate) {
        return -1;
      }
      return 0;
    });
  }

  // const newMessageIds = newMessages.reverse().map((message: Message) => message._id);


  const newMessageIds = newMessages.reduceRight((ids: { [rid: string]: string[] }, message: Message) => {
    const addedMessageIds = ids[message.rid] ? ids[message.rid] : [];
    return Object.assign(ids, {
      [message.rid]: [...addedMessageIds, message._id]
    });
  }, {});

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

export const getIds = (state: State) => state.ids;
export const getRids = (state: State) => state.rids;
export const getEntites = (state: State) => state.entities;
