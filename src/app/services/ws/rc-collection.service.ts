import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as message from '../../actions/message/message';
import * as fromRoot from '../../reducers';
import {Message} from "../../models/ddp/message.model";

@Injectable()
export class RCCollectionService {

  userId: string;

  constructor(private store: Store<fromRoot.State>) {
    store.select(fromRoot.getLoginSuccess).subscribe((user: any) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  changed(obj: any) {

    if (obj.collection === 'stream-room-messages') {
      const messages: Message[] = obj.fields.args;
      if (this.userId && messages[0].u._id !== this.userId) {
        this.store.dispatch(new message.AddMessageAction(messages[0]));
      }
    }

  }
}
