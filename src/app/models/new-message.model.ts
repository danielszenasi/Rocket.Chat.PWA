import {User} from "./ddp/user.model";
export class NewMessage {
  constructor(public msg: string,
              public rid: string,
              public _id: string,
              public u: User) {
  }

}
