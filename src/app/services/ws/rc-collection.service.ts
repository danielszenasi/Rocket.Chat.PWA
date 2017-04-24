import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as message from '../../actions/message/message';
import * as fromRoot from '../../reducers';
import {Message} from "../../models/ddp/message.model";

@Injectable()
export class RCCollectionService {

  constructor(private store: Store<fromRoot.State>) {
  }

  changed(obj: any) {

    if (obj.collection === 'stream-room-messages') {
      const messages: Message[] = obj.fields.args;
      this.store.dispatch(new message.AddMessageAction(messages[0]));
    }

  }
}
