import {LoadHistoryDTO} from "../../models/dto/load-history-dto.model";
import { Action } from '@ngrx/store';
import {RoomIdWithMessages} from "../../models/roomid-with-messages.model";
/**
 * Created by danielszenasi on 2017. 04. 16..
 */

export const LOAD_HISTORY =          '[Room] Load history';
export const LOAD_HISTORY_COMPLETE = '[Room] Load history Complete';

export class LoadHistoryAction implements Action {
  readonly type = LOAD_HISTORY;

  constructor(public payload: LoadHistoryDTO) { }
}

export class LoadHistoryCompleteAction implements Action {
  readonly type = LOAD_HISTORY_COMPLETE;

  constructor(public payload: RoomIdWithMessages) { }
}

export type Actions
  = LoadHistoryAction
  | LoadHistoryCompleteAction;
