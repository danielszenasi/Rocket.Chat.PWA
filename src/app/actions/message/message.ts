import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Action} from '@ngrx/store';
import {Message} from '../../models/ddp/message.model';
import {MessageWithId} from "../../models/message-with-id.model";

export const LOAD = '[Message] Load ';
export const LOAD_COMPLETE = '[Message] Load  Complete';
export const LOAD_FAIL = '[Message] Load  Fail';
export const LOAD_HISTORY = '[Message] Load history';
export const LOAD_HISTORY_COMPLETE = '[Message] Load history Complete';

export class LoadHistoryAction implements Action {
  readonly type = LOAD_HISTORY;

  constructor(public payload: LoadHistoryDTO) {
  }
}

export class LoadHistoryCompleteAction implements Action {
  readonly type = LOAD_HISTORY_COMPLETE;

  constructor(public payload: MessageWithId) {
  }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor() {
  }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;

  constructor(public payload: { [rid: string]: Message[] }) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: { [rid: string]: Message[] }) {
  }
}

export type Actions
  = LoadHistoryAction
  | LoadAction
  | LoadCompleteAction
  | LoadFailAction
  | LoadHistoryCompleteAction;
