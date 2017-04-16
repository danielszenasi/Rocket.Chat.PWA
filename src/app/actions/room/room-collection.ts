import { Action } from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


export const ADD_ROOM =             '[Collection] Add Room';
export const ADD_ROOM_SUCCESS =     '[Collection] Add Room Success';
export const ADD_ROOM_FAIL =        '[Collection] Add Room Fail';
export const REMOVE_ROOM =          '[Collection] Remove Room';
export const REMOVE_ROOM_SUCCESS =  '[Collection] Remove Room Success';
export const REMOVE_ROOM_FAIL =     '[Collection] Remove Room Fail';
export const LOAD =                 '[Collection] Load';
export const LOAD_SUCCESS =         '[Collection] Load Success';
export const LOAD_FAIL =            '[Collection] Load Fail';


/**
 * Add Room to Collection Actions
 */
export class AddRoomAction implements Action {
  readonly type = ADD_ROOM;

  constructor(public payload: RoomSubscription) { }
}

export class AddRoomSuccessAction implements Action {
  readonly type = ADD_ROOM_SUCCESS;

  constructor(public payload: RoomSubscription) { }
}

export class AddRoomFailAction implements Action {
  readonly type = ADD_ROOM_FAIL;

  constructor(public payload: RoomSubscription) { }
}


/**
 * Remove Room from RoomCollection Actions
 */
export class RemoveRoomAction implements Action {
  readonly type = REMOVE_ROOM;

  constructor(public payload: RoomSubscription) { }
}

export class RemoveRoomSuccessAction implements Action {
  readonly type = REMOVE_ROOM_SUCCESS;

  constructor(public payload: RoomSubscription) { }
}

export class RemoveRoomFailAction implements Action {
  readonly type = REMOVE_ROOM_FAIL;

  constructor(public payload: RoomSubscription) {}
}

/**
 * Load RoomCollection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: RoomSubscription[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddRoomAction
  | AddRoomSuccessAction
  | AddRoomFailAction
  | RemoveRoomAction
  | RemoveRoomSuccessAction
  | RemoveRoomFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
