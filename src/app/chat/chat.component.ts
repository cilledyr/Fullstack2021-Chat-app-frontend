import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounce, debounceTime, take, takeUntil} from 'rxjs/operators';
import {ChatMessage} from './shared/chat-message.model';
import {ChatUser} from './shared/chat-user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatClient: ChatUser | undefined;
  newMessageFC = new FormControl('');
  newNameFC = new FormControl('');
  allMessages: ChatMessage[] = [];
  participants: ChatUser[] = [];
  participantsTyping: ChatUser[] = [];
  unsubscriber = new Subject();
  nameError$: Observable<string> | undefined;
  socketId: string | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe((id) => {
        this.socketId = id;
        console.log('Connect ', id);
      });
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(message => {
      console.log('heloooooo');
      this.allMessages.push(message);
      this.chatService.allMessagesInt = this.allMessages.length;
    });
    this.chatService.listenForParticipants()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(clients => {
      console.log('I see everyone');
      this.participants = clients;
    });
    this.chatService.listenForClientTyping()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(client => {
        if (client.typing && !this.participantsTyping.find(c => c.id === client.id)) {
         this.participantsTyping.push(client);
        }
        else {
          this.participantsTyping = this.participantsTyping.filter(c => c.id !== client.id);
        }
      });
    this.chatService.listenForWelcome().pipe(takeUntil(this.unsubscriber)).subscribe(welcome => {
        this.allMessages = welcome.allMessages;
        this.participants = welcome.allUsers;
        this.chatClient = this.chatService.chatClient = welcome.thisClient;
        this.chatService.allMessagesInt = welcome.allMessages.length;
      }
    );
    this.nameError$ = this.chatService.listenForErrors();
    this.newMessageFC.valueChanges
      .pipe(
        takeUntil(this.unsubscriber),
        debounceTime(500)
      )
      .subscribe(value => {
        this.chatService.sendTyping(value.length > 0);
      });
    if (this.chatService.chatClient)
    {
      this.chatService.sendName(this.chatService.chatClient.nickName);
    }


    this.chatService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe((id) => {
        this.socketId = id;
        console.log('Disconnect ', id);
      });
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.chatService.allMessagesInt = this.allMessages.length;
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  sendMessage(): void {
    console.log(this.newMessageFC.value);
    this.chatService.sendMessage(this.newMessageFC.value);
    this.newMessageFC.setValue('');
  }

  registerName(): void {
    if (this.newNameFC.value)
    {
      this.chatService.sendName(this.newNameFC.value);
    }
    console.log(this.newNameFC.value + ' registered');
  }

}
