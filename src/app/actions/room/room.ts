import {Action} from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export const SEARCH =                '[Room] Search';
export const SEARCH_COMPLETE =       '[Room] Search Complete';
export const LOAD =                  '[Room] Load';
export const SELECT =                '[Room] Select';


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


export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction;
