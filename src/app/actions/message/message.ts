import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Action} from '@ngrx/store';
import {NewMessage} from '../../models/new-message.model';
import {Message} from '../../models/ddp/message.model';

export const LOAD = '[Message] Load ';
export const LOAD_SUCCESS = '[Message] Load  Success';
export const LOAD_FAIL = '[Message] Load  Fail';

export const SEND_MESSAGE = '[Message] Send Message';
export const SEND_MESSAGE_SUCCESS = '[Message] Send Message Success';
export const SEND_MESSAGE_FAIL = '[Message] Send Message Fail';

export const ADD_MESSAGE = '[Message] Add Message';

export const STORE_MESSAGE = '[Message] Store Message';
export const STORE_MESSAGE_SUCCESS = '[Message] Store Message Success';
export const STORE_MESSAGE_FAIL = '[Message] Store Message Fail';

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor() {
  }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Message[]) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {
  }
}

export class SendMessageAction implements Action {
  readonly type = SEND_MESSAGE;

  constructor(public payload: Message) {
  }
}

export class SendMessageSuccessAction implements Action {
  readonly type = SEND_MESSAGE_SUCCESS;

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

export class StoreMessageAction implements Action {
  readonly type = STORE_MESSAGE;

  constructor(public payload: Message[]) {
  }
}

export class StoreMessageSuccessAction implements Action {
  readonly type = STORE_MESSAGE_SUCCESS;

  constructor(public payload: Message[]) {
  }
}

export class StoreMessageFailAction implements Action {
  readonly type = STORE_MESSAGE_FAIL;

  constructor(public payload: Message[]) {
  }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | SendMessageAction
  | SendMessageSuccessAction
  | SendMessageFailAction
  | AddMessageAction
  | StoreMessageAction
  | StoreMessageSuccessAction
  | StoreMessageFailAction;
