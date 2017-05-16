import {Message, SyncState} from '../../models/ddp/message.model';
import * as message from '../../actions/message/message';
import * as room from '../../actions/room/room';
import {MessagesWithRoomName} from "../../models/dto/messages-with-rid.model";

export interface State {
  rids: string[];
  entities: { [roomName: string]: Message[] };
  ids: string[]; // order is important
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  rids: [],
  entities: {},
  ids: [],
  loaded: false,
  loading: false
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

    case room.SELECT_COMPLETE: {
      const messagesWithRoomName: MessagesWithRoomName = action.payload;
      const newMessageIds = messagesWithRoomName.messages.map((message: Message) => message._id);
      const newRoomIds = state.rids.includes(messagesWithRoomName.roomName) ? state.rids : [...state.rids, messagesWithRoomName.roomName];
      return {
        rids: newRoomIds,
        ids: [...state.ids, ...newMessageIds],
        entities: Object.assign({}, state.entities, {[messagesWithRoomName.roomName]: messagesWithRoomName.messages}),
        loading: false,
        loaded: true,
      };
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


export const getIds = (state: State) => state.ids;
export const getRids = (state: State) => state.rids;
export const getEntities = (state: State) => state.entities;
