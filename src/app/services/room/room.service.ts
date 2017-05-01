import {Injectable} from '@angular/core';
import {DDPService} from '../ws/ddp.service';
import {NewMessage} from '../../models/new-message.model';
import {DateDTO} from '../../models/dto/date-dto.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as room from '../../actions/room/room';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {Observable} from 'rxjs/Observable';
import {of} from "rxjs/observable/of";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RoomService {

  private subscribedRoomIds: string[] = [];
  private rooms: { [name: string]: RoomSubscription };
  private selectedRoomName: string;

  private loaded = false;
  private loadedSubject: Subject<boolean>;

  constructor(private ddp: DDPService,
              private store: Store<fromRoot.State>) {

    this.loadedSubject = new Subject();

    store.select(fromRoot.getRoomEntities).subscribe((rooms: { [name: string]: RoomSubscription }) => {
      if (!this.isEmpty(rooms)) {
        this.rooms = rooms;
        this.loaded = true;
        this.loadedSubject.next(true);
        this.loadedSubject.complete();
      }
    });

  }

  getSubscription() {
    return this.ddp.call('subscriptions/get', []);
  }

  roomSelected(name: string): Observable<any> {
    if (this.loaded) {
      return this.getRoomSelected(name);
    } else {
      return this.loadedSubject.switchMap((loaded) => {
        return this.getRoomSelected(name);
      });
    }

  }

  getRoomSelected(name: string) {
    this.selectedRoomName = name;
    if (!this.rooms[name]) {
      return; // TODO new error
    }
    const room = this.rooms[name];

    if (room && !this.subscribedRoomIds.includes(room.rid)) {
      this.subscribedRoomIds = [...this.subscribedRoomIds, room.rid];
      this.ddp.subscribe('stream-room-messages', [
        room.rid,
        false
      ]);
      return this.ddp.call('loadHistory', [
        room.rid,
        null,
        50,
        new DateDTO(room.ls)
      ]).map((data: any) => data.messages);
    }

    return of([]);
  }

  sendMessage(newMessage: NewMessage) {
    return this.ddp.call('sendMessage', [newMessage])
      .map((data: any) => data.messages);
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
