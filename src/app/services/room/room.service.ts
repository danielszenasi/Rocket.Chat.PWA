import {Injectable} from '@angular/core';
import {LoadHistoryDTO} from '../../models/dto/load-history-dto.model';
import {DDPService} from '../ws/ddp.service';

@Injectable()
export class RoomService {

  constructor(private ddp: DDPService) {
  }

  getSubscription() {
    return this.ddp.call('subscriptions/get', []);
  }

  loadHistory(loadHistoryDTO: LoadHistoryDTO) {
    return this.ddp.call('loadHistory', [
      loadHistoryDTO.roomId,
      loadHistoryDTO.timestamp,
      loadHistoryDTO.count,
      loadHistoryDTO.lastSeen
    ]).map((data: any) => data.messages);
  }
}
