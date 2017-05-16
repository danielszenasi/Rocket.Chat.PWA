import {User} from './user.model';

export enum SyncState {
  NOT_SYNCED,
  SYNCING,
  SYNCED,
  FAILED
}

export class Message {
  constructor(public msg: string,
              public _id: string,
              public rid: string,
              public u: User,
              public ts: string, // Date
              public syncstate: SyncState,
              public groupable: boolean,
              public _updatedAt?: string, // Date
              public t?: string,
              public alias?: string,
              public avatar?: string,
              public attachments?: string,
              public urls?: string,
              public sameDay?: boolean) {
  }
}
