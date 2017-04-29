import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as message from '../../actions/message/message';
import * as fromRoot from '../../reducers';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {DateDTO} from '../../models/dto/date-dto.model';
import {Observable} from 'rxjs/Observable';
import {Message} from "../../models/ddp/message.model";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent {
  messages$: Observable<Message[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.messages$ = store.select(fromRoot.getLoadHistoryComplete);
    this.messages$.subscribe(asd => {
      console.log(22, 'room.component.ts', asd);
    });
  }
}
