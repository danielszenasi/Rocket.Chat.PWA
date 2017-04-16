import {Injectable} from '@angular/core';
import {RCDDPClient} from '../api/rc-ddp-client';
import {LoadHistoryDTO} from "../../models/dto/load-history-dto.model";

@Injectable()
export class RoomService {

  constructor(private ddp: RCDDPClient) {
  }

  getSubscription() {
    return this.ddp.rpc('subscriptions/get', []);
  }

  loadHistory(loadHistoryDTO: LoadHistoryDTO) {
    return this.ddp.rpc('loadHistory', [
      loadHistoryDTO.roomId,
      loadHistoryDTO.timestamp,
      loadHistoryDTO.count,
      loadHistoryDTO.lastSeen
    ]).map((data: any) => data.messages);
  }
}
