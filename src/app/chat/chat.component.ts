import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ChatMessage} from './shared/chat-message.model';
import {ChatUser} from './shared/chat-user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  name: string | undefined;
  message = new FormControl('');
  newName = new FormControl('');
  allMessages: ChatMessage[] = [];
  participants: ChatUser[] = [];
  unsubscriber = new Subject();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(message => {
      console.log('heloooooo');
      this.allMessages.push(message);
    });
    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(messages => {
        console.log('Got all of them');
        this.allMessages = messages;
      });
    this.chatService.listenForParticipants()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(clients => {
      console.log('I see everyone');
      this.participants = clients;
    });
    this.chatService.connect();
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscriber.next();
    this.unsubscriber.complete();
    this.chatService.disconnect();
    /*if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }*/
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }

  registerName(): void {
    this.name = this.newName.value;
    if (this.name)
    {
      this.chatService.sendName(this.name);
    }
    console.log(this.newName.value + ' registered');
  }

}
