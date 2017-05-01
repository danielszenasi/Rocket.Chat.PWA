import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {Message} from '../../models/ddp/message.model';
import {ActivatedRoute} from '@angular/router';
import * as room from '../../actions/room/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent {
  messages$: Observable<Message[]>;
  private sub: any;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
    this.messages$ = store.select(fromRoot.getLoadHistoryComplete);

    this.route.params.subscribe(params => {
      const name: string = params['name'];
      this.store.dispatch(new room.SelectAction(name));
    });
  }

}
