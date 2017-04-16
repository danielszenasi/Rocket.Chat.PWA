import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {Message} from '../../models/ddp/message.model';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import * as message from '../../actions/message/message';
import {RoomService} from '../../services/room/room.service';
import {RoomIdWithMessages} from '../../models/roomid-with-messages.model';


@Injectable()
export class MessageEffects {

  @Effect()
  loadHistory$: Observable<Action> = this.actions$
    .ofType(message.LOAD_HISTORY)
    .map((action: message.LoadHistoryAction) => action.payload)
    .switchMap((loadHistoryDTO: LoadHistoryDTO) => {
      return this.roomService.loadHistory(loadHistoryDTO)
        .map((messages: Message[]) => new message.LoadHistoryCompleteAction(new RoomIdWithMessages(loadHistoryDTO.roomId, messages)))
        .catch(() => of()); // TODO action load failed
    });

  constructor(private actions$: Actions, private roomService: RoomService) {
  }
}
