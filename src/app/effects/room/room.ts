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
import * as message from '../../actions/message/message';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {RoomService} from '../../services/room/room.service';
import {from} from 'rxjs/observable/from';
import {Message} from '../../models/ddp/message.model';
import {go} from '@ngrx/router-store';
import {MessagesWithRoomName} from "../../models/dto/messages-with-rid.model";


@Injectable()
export class RoomEffects {

  @Effect({dispatch: false})
  openDB$: Observable<any> = defer(() => {
    return this.db.open('rocket_chat_app');
  });

  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType(room.GET)
    .map(toPayload)
    .switchMap(() => {
      return this.roomService.getSubscription()
        .mergeMap((rooms: RoomSubscription[]) => from([new room.GetCompleteAction(rooms), new room.StoreAction(rooms)]))
        .catch(() => of(new room.GetCompleteAction([])));
    });

  @Effect()
  loadRoomFromCollection$: Observable<Action> = this.actions$
    .ofType(room.LOAD)
    .startWith(new room.LoadAction())
    .switchMap(() =>
      this.db.query('rooms')
        .toArray()
        .map((rooms: RoomSubscription[]) => new room.LoadSuccessAction(rooms))
        .catch(error => of(new room.LoadFailAction(error)))
    );

  @Effect()
  storeRoomToCollection$: Observable<Action> = this.actions$
    .ofType(room.STORE)
    .map((action: room.StoreAction) => action.payload)
    .mergeMap((rooms: RoomSubscription[]) =>
      this.db.insert('rooms', rooms)
        .map((room) => new room.StoreSuccessAction(room))
        .catch(() => of(new room.StoreFailAction(rooms)))
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

  @Effect()
  select$: Observable<Action> = this.actions$
    .ofType(room.SELECT)
    .map((action: room.SelectAction) => action.payload)
    .switchMap((name: string) => {
      return this.roomService.roomSelected(name)
        .mergeMap((messages: Message[]) =>
          from([new room.SelectCompleteAction(new MessagesWithRoomName(name, messages))]))
        .catch(() => of()); // of(new room.SelectFailAction(name)));
    });

  constructor(private actions$: Actions, private db: Database, private roomService: RoomService) {
  }
}
