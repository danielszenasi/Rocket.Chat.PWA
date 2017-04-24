import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import * as EJSON from 'ejson';

@Injectable()
export class WebSocketService {

  private subject: Subject<MessageEvent>;

  public connect(url, openObserver): Subject<any> {
    if (!this.subject) {
      this.subject = this.create(url, openObserver);
    }

    return this.subject;
  }

  private create(url, openHandler: Function): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      // Handle open
      if (openHandler) {
        ws.onopen = function (e) {
          openHandler();
        };
      }

      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: string) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(41, "websocket.service.ts", data);
          ws.send(EJSON.stringify(data));
        }
      },
    };

    return Subject.create(observer, observable).map(response => EJSON.parse(response.data));
  }
}
