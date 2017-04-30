/**
 * Created by danielszenasi on 2017. 04. 30..
 */
import {reducer} from './message';
import * as fromMessages from './message';
import {LoadAction, LoadSuccessAction} from '../../actions/message/message';
import {SelectCompleteAction, SelectAction} from '../../actions/room/room';
import {Message, SyncState} from '../../models/ddp/message.model';
import {User} from '../../models/ddp/user.model';
import {RoomSubscription} from '../../models/ddp/room-subscription.model';

describe('MessagesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromMessages.initialState);
    });
  });

  describe('SELECT_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingMessages(action) {
      const message1 = {
        msg: 'Hello',
        rid: 'r111',
        ts: 'Apr 29 2017 22:32:02',
        u: {
          username: 'username',
          _id: 'BZBh23bo2zu'
        } as User,
        _id: 'm111',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:32:02',
        groupable: false
      } as Message;

      const message2 = {
        msg: 'What"s up?',
        rid: 'r111',
        ts: 'Apr 29 2017 22:31:02',
        u: {
          username: 'username',
          _id: 'BZBh2sfw3bo2zu'
        } as User,
        _id: 'm222',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:31:02',
        groupable: false
      } as Message;
      const createAction = new action([message1, message2]);

      const expectedResult = {
        rids: ['r111'],
        ids: {'r111': ['m222', 'm111']},
        entities: {
          'm111': message1,
          'm222': message2
        },
        loaded: true,
        loading: false,
      };

      const result = reducer(fromMessages.initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    function existingBooks(action) {
      const message1 = {
        msg: 'Hello',
        rid: 'r111',
        ts: 'Apr 29 2017 22:37:02',
        u: {
          username: 'username',
          _id: 'BZBh23bo2zu'
        } as User,
        _id: 'm111',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:37:02',
        groupable: false
      } as Message;

      const message2 = {
        msg: 'What"s up?',
        rid: 'r111',
        ts: 'Apr 29 2017 22:37:02',
        u: {
          username: 'username',
          _id: 'BZBh2sfw3bo2zu'
        } as User,
        _id: 'm222',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:37:02',
        groupable: false
      } as Message;

      const initialState = {
        rids: ['r111'],
        ids: {'r111': ['m111', 'm222']},
        entities: {
          'm111': message1,
          'm222': message2
        }
      } as any;

      // should not replace existing messages
      const differentMessage2 = {
        msg: 'Test 111',
        rid: 'r111',
        ts: 'Apr 29 2017 22:38:02',
        u: {
          username: 'username',
          _id: 'BZBh2sfw3bo2zu'
        } as User,
        _id: 'm222',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:37:02',
        groupable: false
      } as Message;
      const message3 = {
        msg: 'Test 333',
        rid: 'r111',
        ts: 'Apr 29 2017 22:39:02',
        u: {
          username: 'username',
          _id: 'BZBh2sfw3bo2zu'
        } as User,
        _id: 'm333',
        syncstate: SyncState.SYNCED,
        _updatedAt: 'Apr 29 2017 22:37:02',
        groupable: false
      } as Message;


      const createAction = new action([message3, differentMessage2]);

      const expectedResult = {
        rids: ['r111'],
        ids: {'r111': ['m111', 'm222', 'm333']},
        entities: {
          'm111': message1,
          'm222': message2,
          'm333': message3
        },
        loaded: true,
        loading: false,
      };

      const result = reducer(initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    it('should add all books in the payload when none exist', () => {
      noExistingMessages(SelectCompleteAction);
      noExistingMessages(LoadSuccessAction);
    });

    it('should add only new books when books already exist', () => {
      existingBooks(SelectCompleteAction);
      existingBooks(LoadSuccessAction);
    });
  });
});
