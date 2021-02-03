import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Subscription} from 'rxjs';

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
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.sub = this.chatService.listenForMessages().subscribe(message => {
      console.log('heloooooo');
      this.messages.push(message);
    });
    this.sub2 = this.chatService.listenForParticipants().subscribe(clients => {
      console.log('I hear you');
      this.participants = clients;
    });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
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
