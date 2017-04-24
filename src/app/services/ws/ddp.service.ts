import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import {DDPClientSettings} from '../../models/DDPClientSettings';
import {DDPResponse} from '../../models/ddp-response.model';
import {Observer} from 'rxjs/Observer';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RCCollectionService} from "./rc-collection.service";

// TODO add types
@Injectable()
export class DDPService {

  protected session: string;

  protected nextId: number;
  protected subjects: { [key: number]: Subject<any> };

  protected pingInterval: number;
  protected reconnectTimeout: number;

  protected reconnectStatus: {
    attempt: number;
    nextDelay: number;
  };

  public ddpSubject: Subject<DDPResponse>;

  constructor(private wsService: WebSocketService,
              ddpSettings: DDPClientSettings,
              private rcCollectionService: RCCollectionService) {
    this.nextId = 0;
    this.subjects = {};

    this.ddpSubject = <Subject<DDPResponse>>wsService.connect(this.createUrlFromSettings(ddpSettings), () => {
      this.ddpSubject.next({
        msg: 'connect',
        version: '1',
        support: ['1', 'pre2', 'pre1']
      });
    });

    this.ddpSubject.subscribe((data: DDPResponse) => {
      this.message(data);
    }, () => {
      this.onError();
    }, () => {
      this.onClose();
    });

    this.reconnectStatus = {
      attempt: 0,
      nextDelay: 0,
    };
  }

  onError() {
    console.log(55, "ddp.service.ts", 'error');
    // TODO handle error
  }

  onClose() {
    console.log(60, "ddp.service.ts", 'close');
    // TODO handle close
  }

  public callWithObj(obj: any): Observable<any> {
    const id = this.getNextId();
    obj.id = id.toString();
    this.ddpSubject.next(obj);

    if (!this.subjects[id]) {
      this.subjects[id] = new Subject<any>();
    }
    return this.subjects[id].asObservable();
  }

  private getNextId(): number {
    return (this.nextId += 1);
  }

  send(msg: string, id?: number) {
    console.log(84, "ddp.service.ts", msg, id);
    const data = id ? {msg: msg, id: id.toString()} : {msg: msg};
    this.ddpSubject.next(data);
  }

  ping() {
    this.send('ping');
  }

  protected unsubscribe(id: string) {
    this.send('unsub');
  }

  public call(name: string, params: any[]): Observable<any> {
    return this.callWithObj({
      msg: 'method',
      method: name,
      params: params
    });
  }

  public subscribe(name: string, params: any[]): Observable<any> {
    return this.callWithObj({
      msg: 'sub',
      name: name,
      params: params
    });
  }

  private message(data: DDPResponse) {

    let subject: Subject<any>;

    switch (data.msg) {
      case 'failed':
        break;
      case 'connected':
        break;

      // method result
      case 'result':
        console.log(121, "ddp.service.ts", data);
        subject = this.subjects[data.id];

        if (subject) {
          if (data.error) {
            subject.error(data.error);
          } else {
            subject.next(data.result);
          }
          subject.complete();
          delete this.subjects[data.id];
        }
        break;
      // method updated
      case 'updated':
        break;

      // missing subscription
      case 'nosub':
        break;
      // subscriptions ready
      case 'ready':
        break;


      case 'ping':
        console.log(138, "ddp.service.ts", data.id);
        this.send('pong');
        break;
      // server respond to my ping
      case 'pong':
        // TODO: set up a system to detect if the server did not respond to my ping (server down)
        break;
      // Beep
      case 'beep':
        // Handle by the parent
        break;
      case 'server_id':
        // Server just tell us his ID
        break;
      // Error
      case 'error':
        console.warn('DDP error', data, data.id, data.error, data.reason);
        break;

      // // add document to collection
      // case 'added':
      // // remove document from collection
      // case 'removed':

      case 'changed':
        console.log(171, "ddp.service.ts", data);
        this.rcCollectionService.changed(data);
        break;
      default:
        console.warn('DDP cannot handle this message', data);
        break;
    }
  }

  private createUrlFromSettings(ddpSettings: DDPClientSettings) {
    const path = (ddpSettings.path.indexOf('/') === 0) ? ddpSettings.path : '/' + ddpSettings.path;
    const protocol = ddpSettings.ssl ? 'wss://' : 'ws://';
    const host = ddpSettings.port ? `${ddpSettings.host}:${ddpSettings.port}` : ddpSettings.host;
    return `${protocol}${host}${path}`;
  }

}
