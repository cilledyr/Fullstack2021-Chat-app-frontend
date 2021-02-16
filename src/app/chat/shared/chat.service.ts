import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ChatMessage} from './chat-message.model';
import {ChatUser} from './chat-user.model';
import {WelcomeDto} from './welcome.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatClient: ChatUser | undefined;
  allMessagesInt = 0;


  constructor(private socket: Socket) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  sendName(name: string): void {
    this.socket.emit('name', name);
  }

  listenForMessages(): Observable<ChatMessage> {
    return this.socket.fromEvent<ChatMessage>('newMessage');
  }

  listenForParticipants(): Observable<ChatUser[]> {
    return this.socket.fromEvent<ChatUser[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket.fromEvent<WelcomeDto>('welcome');
  }

  listenForClientTyping(): Observable<ChatUser> {
    return this.socket.fromEvent<ChatUser>('clientTyping');
  }

  listenForErrors(): Observable<string> {
    return this.socket.fromEvent<string>('error');
  }
  getAllMessages(): Observable<ChatMessage[]> {
    return this.socket.fromEvent<ChatMessage[]>('allMessages');
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }

  sendTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }
}
