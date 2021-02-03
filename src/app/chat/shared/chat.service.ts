import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

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

  listenForMessages(): Observable<string> {
    return this.socket.fromEvent<string>('messages');
  }

  listenForParticipants(): Observable<Array<string>> {
    return this.socket.fromEvent<Array<string>>('clients');
  }
}
