import {Message} from './ddp/message.model';
/**
 * Created by danielszenasi on 2017. 04. 22..
 */
export class MessageWithId {
  constructor(public rid: string,
              public messages: Message[]) {
  }

}
