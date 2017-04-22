/**
 * Created by danielszenasi on 2017. 04. 19..
 */
export class DDPClientSettings {
  constructor(public host: string,
              public ssl: boolean,
              public path: string,
              public ddpVersion: string,
              public pingInterval: number,
              public reconnectInterval: number,
              public port?: number) {
  }

}
