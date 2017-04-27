import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Message} from '../../models/ddp/message.model';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import {Injectable} from '@angular/core';
import * as message from '../../actions/message/message';
import {RoomService} from '../../services/room/room.service';
import {defer} from 'rxjs/observable/defer';
import {Database} from '@ngrx/db';
import {NewMessage} from '../../models/new-message.model';

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
        .catch(() => of(new message.LoadHistoryCompleteAction([])));
    }).mergeMap((messages: Message[]) => from([new message.LoadHistoryCompleteAction(messages), new message.StoreMessageAction(messages)]));

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(message.LOAD)
    .startWith(new message.LoadAction())
    .switchMap(() =>
      this.db.query('messages')
        .toArray()
        .map((messages) => {
          return new message.LoadSuccessAction(messages);
        })
        .catch(error => of(new message.LoadFailAction(error)))
    );

  @Effect()
  storeMessage$: Observable<Action> = this.actions$
    .ofType(message.STORE_MESSAGE)
    .map((action: message.LoadHistoryCompleteAction) => action.payload)
    .mergeMap((messages: Message[]) =>
      this.db.insert('messages', messages)
        .map(() => new message.StoreMessageSuccessAction(messages))
        .catch(() => of(new message.StoreMessageFailAction(messages)))
    );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$
    .ofType(message.SEND_MESSAGE)
    .map((action: message.SendMessageAction) => action.payload)
    .switchMap((newMessage: NewMessage) => {
      return this.roomService.sendMessage(newMessage)
        .map((messages: Message) => new message.SendMessageSuccessAction(messages))
        .catch(() => of(new message.SendMessageFailAction(newMessage)));
    });

  constructor(private actions$: Actions, private db: Database, private roomService: RoomService) {
  }
}
