import { Action } from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {LoadHistoryDTO} from "../../models/dto/load-history-dto.model";
import {Message} from "../../models/ddp/message.model";


export const SEARCH =                '[Room] Search';
export const SEARCH_COMPLETE =       '[Room] Search Complete';
export const LOAD =                  '[Room] Load';
export const SELECT =                '[Room] Select';



/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor() { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: RoomSubscription[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: RoomSubscription) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction;
