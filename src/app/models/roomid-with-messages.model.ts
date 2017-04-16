import {Message} from "./ddp/message.model";
/**
 * Created by danielszenasi on 2017. 04. 16..
 */

export class RoomIdWithMessages {
  constructor(public rid: string,
              public messages: Message[]) {
  }

}
