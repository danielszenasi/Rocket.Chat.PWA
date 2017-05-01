/**
 * Created by danielszenasi on 2017. 04. 23..
 */
import {Injectable} from '@angular/core';
import {NewMessage} from '../../models/new-message.model';
import {User} from '../../models/ddp/user.model';
import {ddpRandom} from '../../helpers/ddp-random';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as message from '../../actions/message/message';
import {Message, SyncState} from "../../models/ddp/message.model";
import {RoomSubscription} from "../../models/ddp/room-subscription.model";

@Injectable()
export class SendMessageService {

  private rid: string;
  private user: User;

  constructor(private store: Store<fromRoot.State>) {

    store.select(fromRoot.getSelectedRoom).subscribe((room: RoomSubscription) => {
      if (room) {
        this.rid = room.rid;
      }
    });
    // store.select(fromRoot.getUser).subscribe((user: User) => {
    this.user = new User('id', 'me');
    // });
  }

  dispatchMessage(msg: string) {
    this.store.dispatch(new message.SendMessageAction(
      new Message(msg, ddpRandom.id(), this.rid, this.user, new Date().toJSON(), SyncState.NOT_SYNCED, false)));
  }
}
