import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  name: string | undefined;
  message = new FormControl('');
  newName = new FormControl('');
  messages: string[] = [];
  participants: string[] = [];
  unsubscriber = new Subject();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(message => {
      console.log('heloooooo');
      this.messages.push(message);
    });
    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(messages => {
        console.log('Got all of them');
        this.messages = messages;
      });
    this.chatService.listenForParticipants()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(clients => {
      console.log('I hear you');
      this.participants = clients;
    });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscriber.next();
    this.unsubscriber.complete();
    /*if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }*/
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.name + ': ' + this.message.value);
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
