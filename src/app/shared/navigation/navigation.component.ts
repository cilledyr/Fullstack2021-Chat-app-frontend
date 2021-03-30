import {Component, Inject, OnInit} from '@angular/core';
import {ChatUser} from '../../chat/shared/chat-user.model';
import {ChatService} from '../../chat/shared/chat.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    //private chatService: ChatService
  ) { }

  chatClient: ChatUser | undefined;
  participantsInt = 0;
  allMessagesInt = 0;
  allMessagesInChatInt = 0;
  unsubscriber = new Subject();
  interval: any;
  unreadmsg = 0;

  ngOnInit(): void {
    /*this.chatService.listenForWelcome().pipe(takeUntil(this.unsubscriber)).subscribe(welcome => {
        this.allMessagesInt = welcome.allMessages.length;
        this.participantsInt = welcome.allUsers.length;
        this.chatClient = welcome.thisClient;
      }
    );

    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(message => {
        this.allMessagesInt += 1;
      });
    this.chatService.listenForParticipants()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(clients => {
        this.participantsInt = clients.length;
      });

    this.startTimer();
  */}

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  startTimer(): void {
    /*.interval = setInterval(() => {
      this.allMessagesInChatInt = this.chatService.allMessagesInt;
      this.unreadmsg = this.allMessagesInt - this.allMessagesInChatInt;
    },1000);*/
  }
}
