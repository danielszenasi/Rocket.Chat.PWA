import {Email} from './email.model';
import {Settings} from './settings.model';

export class User {
  constructor(public _id: string,
              public username: string,
              public status?: string,
              public utcOffset?: number,
              public emails?: Email[],
              public settings?: Settings) {
  }
}

