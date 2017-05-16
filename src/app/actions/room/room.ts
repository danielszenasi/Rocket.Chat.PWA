import {Action} from '@ngrx/store';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {Message} from "../../models/ddp/message.model";
import {MessagesWithRoomName} from "../../models/dto/messages-with-rid.model";


export const GET = '[Rooms] Get';
export const GET_COMPLETE = '[Rooms] Get Complete';

export const SELECT = '[Rooms] Select';
export const SELECT_COMPLETE = '[Rooms] Select Complete';

export const REMOVE_ROOM = '[Rooms] Remove Room';
export const REMOVE_ROOM_SUCCESS = '[Rooms] Remove Room Success';
export const REMOVE_ROOM_FAIL = '[Rooms] Remove Room Fail';

export const LOAD = '[Rooms] Load';
export const LOAD_SUCCESS = '[Rooms] Load Success';
export const LOAD_FAIL = '[Rooms] Load Fail';

export const STORE = '[Rooms] Store';
export const STORE_SUCCESS = '[Rooms] Store Success';
export const STORE_FAIL = '[Rooms] Store Fail';

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

export class SelectCompleteAction implements Action {
  readonly type = SELECT_COMPLETE;

  constructor(public payload: MessagesWithRoomName) {
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

export class StoreAction implements Action {
  readonly type = STORE;

  constructor(public payload: RoomSubscription[]) {
  }
}

export class StoreSuccessAction implements Action {
  readonly type = STORE_SUCCESS;

  constructor(public payload: RoomSubscription[]) {
  }
}

export class StoreFailAction implements Action {
  readonly type = STORE_FAIL;

  constructor(public payload: RoomSubscription[]) {
  }
}

export type Actions
  = GetAction
  | GetCompleteAction
  | SelectAction
  | SelectCompleteAction
  | RemoveRoomAction
  | RemoveRoomSuccessAction
  | RemoveRoomFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | StoreAction
  | StoreSuccessAction
  | StoreFailAction;
