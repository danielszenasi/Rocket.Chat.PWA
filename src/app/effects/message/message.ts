import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Message} from '../../models/ddp/message.model';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import * as message from '../../actions/message/message';
import {RoomService} from '../../services/room/room.service';
import {defer} from 'rxjs/observable/defer';
import {Database} from '@ngrx/db';
import {MessageWithId} from '../../models/message-with-id.model';
import {NewMessage} from "../../models/new-message.model";

@Injectable()
export class MessageEffects {

  @Effect({dispatch: false})
  openDB$: Observable<any> = defer(() => {
    return this.db.open('rocket_chat_app');
  });

  @Effect()
  loadHistory$: Observable<Action> = this.actions$
    .ofType(message.LOAD_HISTORY)
    .map((action: message.LoadHistoryAction) => action.payload)
    .switchMap((loadHistoryDTO: LoadHistoryDTO) => {
      return this.roomService.loadHistory(loadHistoryDTO)
        .map((messages: Message[]) => new message.LoadHistoryCompleteAction([new MessageWithId(loadHistoryDTO.roomId, messages)]))
        .catch(() => of()); // TODO action load failed
    });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(message.LOAD)
    .startWith(new message.LoadAction())
    .switchMap(() =>
      this.db.query('messages')
        .toArray()
        .map((messages) => {
          return new message.LoadCompleteAction(messages);
        })
        .catch(error => of()) // TODO action load failed
    );

  @Effect()
  addRoomToCollection$: Observable<Action> = this.actions$
    .ofType(message.LOAD_HISTORY_COMPLETE)
    .map((action: message.LoadHistoryCompleteAction) => action.payload)
    .mergeMap((messages: MessageWithId[]) =>
      this.db.insert('messages', messages)
        .map(() => new message.LoadCompleteAction([])) // TODO need other action
        .catch(() => of(new message.LoadFailAction(messages)))
    );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$
    .ofType(message.SEND_MESSAGE)
    .map((action: message.SendMessageAction) => action.payload)
    .switchMap((newMessage: NewMessage) => {
      return this.roomService.sendMessage(newMessage)
        .map((messages: Message) => new message.SendMessageCompleteAction(messages))
        .catch(() => of(new message.SendMessageFailAction(newMessage)));
    });

  constructor(private actions$: Actions, private db: Database, private roomService: RoomService) {
  }
}
