import {Action} from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export const REMOVE_ROOM = '[Collection] Remove Room';
export const REMOVE_ROOM_SUCCESS = '[Collection] Remove Room Success';
export const REMOVE_ROOM_FAIL = '[Collection] Remove Room Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';


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
  = RemoveRoomAction
  | RemoveRoomSuccessAction
  | RemoveRoomFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
