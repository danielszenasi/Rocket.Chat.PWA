import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'rocket_chat_app',
  stores: {
    rooms: {
      autoIncrement: true,
      primaryKey: 'rid'
    },
    messages: {
      autoIncrement: true,
      primaryKey: '_id'
    }
  }
};
