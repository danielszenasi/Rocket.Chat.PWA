import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Action} from '@ngrx/store';
import {MessageWithId} from '../../models/message-with-id.model';
import {NewMessage} from '../../models/new-message.model';
import {Message} from '../../models/ddp/message.model';

export const LOAD = '[Message] Load ';
export const LOAD_COMPLETE = '[Message] Load  Complete';
export const LOAD_FAIL = '[Message] Load  Fail';
export const LOAD_HISTORY = '[Message] Load history';
export const LOAD_HISTORY_COMPLETE = '[Message] Load history Complete';
export const SEND_MESSAGE = '[Message] Send Message';
export const SEND_MESSAGE_COMPLETE = '[Message] Send Message Complete';
export const SEND_MESSAGE_FAIL = '[Message] Send Message Complete';
export const ADD_MESSAGE = '[Message] Add Message Complete';

export class LoadHistoryAction implements Action {
  readonly type = LOAD_HISTORY;

  constructor(public payload: LoadHistoryDTO) {
  }
}

export class LoadHistoryCompleteAction implements Action {
  readonly type = LOAD_HISTORY_COMPLETE;

  constructor(public payload: MessageWithId[]) {
  }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor() {
  }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;

  constructor(public payload: MessageWithId[]) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: MessageWithId[]) {
  }
}

export class SendMessageAction implements Action {
  readonly type = SEND_MESSAGE;

  constructor(public payload: NewMessage) {
  }
}

export class SendMessageCompleteAction implements Action {
  readonly type = SEND_MESSAGE_COMPLETE;

  constructor(public payload: Message) {
  }
}

export class SendMessageFailAction implements Action {
  readonly type = SEND_MESSAGE_FAIL;

  constructor(public payload: NewMessage) {
  }
}

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: Message) {
  }
}

export type Actions
  = LoadHistoryAction
  | LoadAction
  | LoadCompleteAction
  | LoadFailAction
  | LoadHistoryCompleteAction
  | SendMessageAction
  | SendMessageCompleteAction
  | SendMessageFailAction
  | AddMessageAction;
