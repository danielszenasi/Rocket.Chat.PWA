import {User} from './user.model';

export class RoomSubscription {
  constructor(public _id: string, // subscriptionId
              public rid: string, // roomId
              public name: string,
              public u: User, // REMARK: do not save u, because it is just me.
              public t: string, // type { c: channel, d: direct message, p: private }
              public open: boolean,
              public alert: boolean,
              public unread: number,
              public _updatedAt: number,
              public ls: number,) { // last seen.
  }

}
