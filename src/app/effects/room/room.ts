import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import {Database} from '@ngrx/db';
import {defer} from 'rxjs/observable/defer';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {RoomService} from '../../services/room/room.service';
import * as login from '../../actions/login/login';


@Injectable()
export class RoomEffects {

  @Effect({dispatch: false})
  openDB$: Observable<any> = defer(() => {
    return this.db.open('rocket_chat_app');
  });

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(login.LOGIN_SUCCESS)
    .map(toPayload)
    .switchMap(() => {
      return this.roomService.getSubscription()
        .map((rooms: RoomSubscription[]) => new room.GetCompleteAction(rooms))
        .catch(() => of(new room.GetCompleteAction([])));
    });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(room.LOAD)
    .startWith(new room.LoadAction())
    .switchMap(() =>
      this.db.query('rooms')
        .toArray()
        .map((rooms: RoomSubscription[]) => new room.LoadSuccessAction(rooms))
        .catch(error => of(new room.LoadFailAction(error)))
    );

  @Effect()
  addRoomToCollection$: Observable<Action> = this.actions$
    .ofType(room.GET_COMPLETE)
    .map((action: room.GetCompleteAction) => action.payload)
    .mergeMap((rooms: RoomSubscription[]) =>
      this.db.insert('rooms', rooms)
        .map(() => new room.LoadSuccessAction(rooms))
        .catch(() => of(new room.LoadFailAction(rooms)))
    );


  @Effect()
  removeRoomFromCollection$: Observable<Action> = this.actions$
    .ofType(room.REMOVE_ROOM)
    .map((action: room.RemoveRoomAction) => action.payload)
    .mergeMap(roomSub =>
      this.db.executeWrite('rooms', 'delete', [roomSub.rid])
        .map(() => new room.RemoveRoomSuccessAction(roomSub))
        .catch(() => of(new room.RemoveRoomFailAction(roomSub)))
    );

  constructor(private actions$: Actions, private db: Database, private roomService: RoomService) {
  }
}
