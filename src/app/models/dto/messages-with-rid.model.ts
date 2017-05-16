import {Message} from "../ddp/message.model";

export class MessagesWithRoomName {
  constructor(public roomName: string,
              public messages: Message[]) {
  }

}
