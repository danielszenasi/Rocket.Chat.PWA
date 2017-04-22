import {Action} from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export const GET = '[Rooms] Get';
export const GET_COMPLETE = '[Rooms] Get Complete';

export const SELECT = '[Rooms] Select';

export const REMOVE_ROOM = '[Rooms] Remove Room';
export const REMOVE_ROOM_SUCCESS = '[Rooms] Remove Room Success';
export const REMOVE_ROOM_FAIL = '[Rooms] Remove Room Fail';

export const LOAD = '[Rooms] Load';
export const LOAD_SUCCESS = '[Rooms] Load Success';
export const LOAD_FAIL = '[Rooms] Load Fail';


export class GetAction implements Action {
  readonly type = GET;

  constructor() {
  }
}

export class GetCompleteAction implements Action {
  readonly type = GET_COMPLETE;

  constructor(public payload: RoomSubscription[]) {
  }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {
  }
}

/**
 * Remove Room from RoomCollection Actions
 */
export class RemoveRoomAction implements Action {
  readonly type = REMOVE_ROOM;

  constructor(public payload: RoomSubscription) {
  }
}

export class RemoveRoomSuccessAction implements Action {
  readonly type = REMOVE_ROOM_SUCCESS;

  constructor(public payload: RoomSubscription) {
  }
}

export class RemoveRoomFailAction implements Action {
  readonly type = REMOVE_ROOM_FAIL;

  constructor(public payload: RoomSubscription) {
  }
}

/**
 * Load RoomCollection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: RoomSubscription[]) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {
  }
}

export type Actions
  = GetAction
  | GetCompleteAction
  | SelectAction
  | RemoveRoomAction
  | RemoveRoomSuccessAction
  | RemoveRoomFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
