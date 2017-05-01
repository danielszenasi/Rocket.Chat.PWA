import {Message, SyncState} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import * as room from '../../actions/room/room';

export interface State {
  rids: string[];
  entities: { [_id: string]: Message };
  ids: { [rid: string]: string[] }; // order is important
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  rids: [],
  entities: {},
  loaded: false,
  loading: false,
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
      if(!messages.length) {
        return state;
      }
      const newState = addMessages(state, messages, false);
      return newState;
    }

    case message.ADD_MESSAGE:
    case message.SEND_MESSAGE: {
      let message: Message = action.payload;
      message = Object.assign({}, message, {syncstate: SyncState.SYNCING});
      if (!state.entities[message._id]) {
        return {
          rids: state.rids,
          ids: Object.assign({}, state.ids, {[message.rid]: [...state.ids[message.rid], message._id]}),
          entities: Object.assign({}, state.entities, {[message._id]: message}),
          loading: false,
          loaded: true,
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

  if (needSort) { // TODO unfortunetly ngrx/db not support to create indexes right now
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

  const newMessageIds = newMessages.reduceRight((ids: { [rid: string]: string[] }, message: Message) => {
    const oldMessageIds = state.ids[message.rid] ? state.ids[message.rid] : [];
    const addedMessageIds = ids[message.rid] ? ids[message.rid] : [];
    return Object.assign(ids, {
      [message.rid]: [...oldMessageIds, ...addedMessageIds, message._id]
    });
  }, {});

  const newMessageEntities = newMessages.reduce((entities: { [id: string]: Message }, message: Message) => {
    message = Object.assign({}, message, {syncstate: SyncState.SYNCED});
    return Object.assign(entities, {
      [message._id]: message
    });
  }, {});
  const newRoomIds = Object.keys(newMessageIds).filter((rid: string) => !state.rids.includes(rid));
  return {
    rids: [...state.rids, ...newRoomIds],
    ids: Object.assign({}, state.ids, newMessageIds),
    entities: Object.assign({}, state.entities, newMessageEntities),
    loading: false,
    loaded: true,
  };
}

export const getIds = (state: State) => state.ids;
export const getRids = (state: State) => state.rids;
export const getEntities = (state: State) => state.entities;
