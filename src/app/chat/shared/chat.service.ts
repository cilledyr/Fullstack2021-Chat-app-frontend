import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {ChatMessage} from './chat-message.model';
import {ChatUser} from './chat-user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

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

  getAllMessages(): Observable<ChatMessage[]> {
    return this.socket.fromEvent<ChatMessage[]>('allMessages');
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }

}
