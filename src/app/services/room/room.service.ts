import {Injectable} from '@angular/core';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {DDPService} from '../ws/ddp.service';
import {NewMessage} from "../../models/new-message.model";

@Injectable()
export class RoomService {

  constructor(private ddp: DDPService) {
  }

  getSubscription() {
    return this.ddp.call('subscriptions/get', []);
  }

  loadHistory(loadHistoryDTO: LoadHistoryDTO) {

    this.ddp.subscribe('stream-room-messages', [
      loadHistoryDTO.roomId,
      false
    ]);


    return this.ddp.call('loadHistory', [
      loadHistoryDTO.roomId,
      loadHistoryDTO.timestamp,
      loadHistoryDTO.count,
      loadHistoryDTO.lastSeen
    ]).map((data: any) => data.messages);
  }

  sendMessage(newMessage: NewMessage) {
    return this.ddp.call('sendMessage', [newMessage])
      .map((data: any) => data.messages);
  }
}
