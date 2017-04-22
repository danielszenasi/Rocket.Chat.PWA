import {Component, Input} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';
import {LoginUser} from '../../models/login-user.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as room from '../../actions/room/room';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  // @Input() user: LoginUser;
  rooms$: Observable<RoomSubscription[]>;

  constructor(iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer,
              private store: Store<fromRoot.State>) {

    this.rooms$ = store.select(fromRoot.getRooms);
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    // const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    // iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  onRoomSelected(selectedRoom: RoomSubscription) {
    this.store.dispatch(new room.SelectAction(selectedRoom.rid));
  }

}
