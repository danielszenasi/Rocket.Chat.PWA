import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {DDPClient} from 'rxjs-ddp-client/src/ddp-client';
import {Hostname} from '../../models/hostname.model';
// import {DDPCacheEngine} from 'rxjs-ddp-client/src/ddp-storage';

export type MY_DDP_COLLECTIONS = 'users' | 'chats';
export const MY_DDP_COLLECTIONS = {
  USERS: 'users' as MY_DDP_COLLECTIONS,
  CHATS: 'chats' as MY_DDP_COLLECTIONS,
};


@Injectable()
export class RCDDPClient extends DDPClient {

  public ddpStatus: {
    isConnected: boolean;
    isDisconnected: boolean;
  };

  constructor(private hostname: Hostname) {
    super();

    this.ddpStatus = {
      isConnected: false,
      isDisconnected: true,
    };
    this.connect(true);
  }

  // initCacheStorage(cacheEngine: DDPCacheEngine) {
  //
  //   this.ddpStorage.setCacheEngine(cacheEngine);
  //   this.ddpStorage.loadFromCache([MY_DDP_COLLECTIONS.CHATS]);
  // }

  connect(usesSecureConnection: boolean) {
    const protocol: string = usesSecureConnection ? 'wss://' : 'ws://';
    super.connect(`${protocol + this.hostname.value}/websocket`);
  }

  rpc(name: string, params) {
    return Observable.fromPromise(this.callWithPromise(name, params));
  }

  //
  // logout() {
  //   this.ddpStorage.clearCache([MY_DDP_COLLECTIONS.CHATS]);
  //   super.close();
  // }

  // Events called by DDPClient
  onConnected() {
    // DDP connected, now we can login and subscribe to the publications on the server

    this.ddpStatus.isConnected = true;
    this.ddpStatus.isDisconnected = false;
    // this.subscribePublications();
    // this.login()
    //   .then(() => {
    //   console.log(70, "rc-ddp-client.ts", 'login');
    //     this.subscribePublications();
    //     this.observeCollections();
    //   });
  }

  onDisconnected() {
    // DDP disconnected, notify user

    this.ddpStatus.isConnected = true;
    this.ddpStatus.isDisconnected = false;
  }

  onSocketError(error) {
    console.log(83, 'rc-ddp-client.ts', error);
  }

  onSocketClosed() {
    console.log(87, 'rc-ddp-client.ts', 'onSocketClosed');
  }

  onMessage(data) {
    console.log(91, 'rc-ddp-client.ts', data);
  }

  // Custom utility methos
  // subscribePublications() {
  //   // const since = this.ddpStorage.lastSyncTime;
  //   this.subscribe('userData', []);
  //   this.subscribe('activeUsers', []);
  //   // this.subscribe('chats', [since]);
  //   this.subscribe('stream-notify-all', []);
  //   this.subscribe('stream-notify-room', []);
  //   this.subscribe('stream-notify-user', []);
  //   this.subscribe('scopedRoles', 'Users');
  //   this.subscribe('scopedRoles', 'Subscriptions');
  //   this.subscribe('roles', []);
  //   this.subscribe('integrations', []);
  //   this.subscribe('oauthApps', []);
  //   this.subscribe('subscription', []);
  //   this.subscribe('userData', []);
  //   this.subscribe('meteor_autoupdate_clientVersions', []);
  //   this.subscribe('stream-messages', null);
  // }
  //
  // observeCollections() {
  //   this.observeCollection<IUser[]>(MY_DDP_COLLECTIONS.USERS)
  //     .subscribe(items => console.log('Users:', items));
  // }
  //
  // getAllCollectionData$(collectionName: MY_DDP_COLLECTIONS) {
  //   // To access data direcly from the collection you can use the ddpStorage methods
  //   return this.ddpStorage.getObservable(collectionName);
  // }

}
