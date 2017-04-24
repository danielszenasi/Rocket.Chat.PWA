import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SendMessageService} from '../../services/message/send-message.service';


@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMessageComponent {

  msg: string;

  constructor(private sendMessageService: SendMessageService) {
  }

  sendMessage() {
    this.sendMessageService.dispatchMessage(this.msg);
    // this.store.dispatch(new message.SendMessageAction(new NewMessage(this.msg, this.rid, ddpRandom.id(), new User('asd', 'asd'))));
  }

}
