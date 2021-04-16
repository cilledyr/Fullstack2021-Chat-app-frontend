import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ChatMessage} from './chat-message.model';
import {ChatUser} from './chat-user.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';
import {ChatSocket} from '../../app.module';
import {JoinChatDto} from './join-chat.dto';
import {StorageService} from '../../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //chatClient: ChatUser | undefined;
  allMessagesInt = 0;


  constructor(private socket: ChatSocket) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  joinChat(dto: JoinChatDto): void {
    this.socket.emit('joinChat', dto);
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

  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
          })
      );
  }

  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect').pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
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
