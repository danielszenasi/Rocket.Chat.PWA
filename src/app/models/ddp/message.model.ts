import {User} from './user.model';

export class Message {
  constructor(public _id: string,
              public t: string,
              public rid: string,
              public syncstate: number,
              public ts: number,
              public msg: string,
              public u: User,
              public groupable: boolean,
              public alias: string,
              public avatar: string,
              public attachments: string,
              public urls: string) {
  }
}
