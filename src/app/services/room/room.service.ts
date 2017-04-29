import {Injectable} from '@angular/core';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {DDPService} from '../ws/ddp.service';
import {NewMessage} from "../../models/new-message.model";
import {RoomSubscription} from "../../models/ddp/room-subscription.model";
import {DateDTO} from "../../models/dto/date-dto.model";

@Injectable()
export class RoomService {

  private subscribedRoomId: string;

  constructor(private ddp: DDPService) {
  }

  getSubscription() {
    return this.ddp.call('subscriptions/get', []);
  }

  roomSelected(room: RoomSubscription) {

    if (this.subscribedRoomId) {
      // TODO unsubscribe
    }

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

  sendMessage(newMessage: NewMessage) {
    return this.ddp.call('sendMessage', [newMessage])
      .map((data: any) => data.messages);
  }
}
