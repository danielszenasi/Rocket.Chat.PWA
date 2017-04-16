import {DateDTO} from './date-dto.model';
/**
 * Created by danielszenasi on 2017. 04. 16..
 */
export class LoadHistoryDTO {
  constructor(public roomId: string,
              public count: number,
              public lastSeen: DateDTO,
              public timestamp?: DateDTO) {
  }

}
