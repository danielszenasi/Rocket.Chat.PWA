import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions} from '@ngrx/effects';
import {Database} from '@ngrx/db';
import {Observable} from 'rxjs/Observable';
import {defer} from 'rxjs/observable/defer';
import {of} from 'rxjs/observable/of';

import * as roomCollection from '../../actions/room/room-collection';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';


@Injectable()
export class RoomCollectionEffects {

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({dispatch: false})
  openDB$: Observable<any> = defer(() => {
    return this.db.open('rooms_app');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(roomCollection.LOAD)
    .startWith(new roomCollection.LoadAction())
    .switchMap(() =>
      this.db.query('rooms')
        .toArray()
        .map((rooms: RoomSubscription[]) => new roomCollection.LoadSuccessAction(rooms))
        .catch(error => of(new roomCollection.LoadFailAction(error)))
    );

  @Effect()
  addRoomToCollection$: Observable<Action> = this.actions$
    .ofType(room.SEARCH_COMPLETE)
    .map((action: room.SearchCompleteAction) => action.payload)
    .mergeMap((rooms: RoomSubscription[]) =>
      this.db.insert('rooms', rooms)
        .map(() => new roomCollection.LoadSuccessAction(rooms))
        .catch(() => of(new roomCollection.LoadFailAction(rooms)))
    );


  @Effect()
  removeRoomFromCollection$: Observable<Action> = this.actions$
    .ofType(roomCollection.REMOVE_ROOM)
    .map((action: roomCollection.RemoveRoomAction) => action.payload)
    .mergeMap(room =>
      this.db.executeWrite('rooms', 'delete', [room.rid])
        .map(() => new roomCollection.RemoveRoomSuccessAction(room))
        .catch(() => of(new roomCollection.RemoveRoomFailAction(room)))
    );

  constructor(private actions$: Actions, private db: Database) {
  }
}
