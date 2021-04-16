import { Injectable } from '@angular/core';
import {ChatUser} from '../chat/shared/chat-user.model';
import {Stock} from '../stocks/shared/stocks.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveChatUser(chatUser: ChatUser): void {
    localStorage.setItem('user', JSON.stringify(chatUser));
  }

  loadChatUser(): ChatUser | undefined {
    const chatClientString = localStorage.getItem('user');
    if(chatClientString)
    {
      const chatUser : ChatUser =JSON.parse(chatClientString);
      return chatUser;
    }
    return undefined;
  }

  saveStocks(theStocks: Stock[]): void {
    localStorage.setItem('stocks', JSON.stringify(theStocks));
  }

  loadStocks(): Stock[] | undefined{
    const theStocks = localStorage.getItem('stocks');
    if(theStocks)
    {
      const stockList : Stock[] = JSON.parse(theStocks);
      return stockList;
    }
    return undefined;
  }
}
