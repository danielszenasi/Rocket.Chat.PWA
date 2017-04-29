/**
 * Created by danielszenasi on 2017. 04. 20..
 */
export class DDPResponse {
  constructor(public msg: string,
              public session?: string,
              public id?: string,
              public method?: string,
              public params?: any[],
              public result?: any,
              public error?: any,
              public reason?: string,
              public version?: string,
              public support?: string[]) {
  }

}
