import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {RoomService} from '../../services/room/room.service';
import * as login from '../../actions/login/login';


@Injectable()
export class RoomEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(login.LOGIN_SUCCESS)
    .map(toPayload)
    .switchMap(() => {
      return this.roomService.getSubscription()
        .map((rooms: RoomSubscription[]) => new room.SearchCompleteAction(rooms))
        .catch(() => of(new room.SearchCompleteAction([])));
    });

  constructor(private actions$: Actions, private roomService: RoomService) {
  }
}
