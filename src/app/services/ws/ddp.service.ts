import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import {DDPClientSettings} from '../../models/DDPClientSettings';
import {DDPResponse} from '../../models/ddp-response.model';
import {Observer} from 'rxjs/Observer';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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

  constructor(private wsService: WebSocketService, ddpSettings: DDPClientSettings) {
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
    // TODO handle error
  }

  onClose() {
    // TODO handle close
  }

  public call(name: string, params: any[], msg: string = 'method'): Observable<any> {
    const id = this.getNextId();
    this.ddpSubject.next({
      msg: msg,
      id: id.toString(),
      method: name,
      params: params
    });

    if (!this.subjects[id]) {
      this.subjects[id] = new Subject<any>();
    }
    return this.subjects[id].asObservable();
  }

  private getNextId(): number {
    return (this.nextId += 1);
  }

  send(msg: string, id?: number) {
    const data = id ? {msg: msg, id: id.toString()} : {msg: name};
    this.ddpSubject.next(data);
  }

  ping() {
    this.send('ping');
  }

  protected unsubscribe(id: string) {
    this.send('unsub');
  }

  public subscribe(name: string, params: any[], handler: Observer<any>): Observable<any> {
    return this.call(name, params, 'sub');
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
        this.send('pong', Number(data.id));
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
        console.warn('DDP error', data.error, data.reason);
        break;

      // // add document to collection
      // case 'added':
      // // remove document from collection
      // case 'removed':
      // // change document in collection
      // case 'changed':

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
