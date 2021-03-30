import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StocksSocket} from '../../app.module';
import {Stock} from './stocks.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private socket: StocksSocket) { }

  listenForStocks(): Observable < Stock[] > {
    return this.socket.fromEvent<Stock[]>('stocks');
  }

  changeStock(value: number, stock: Stock): void {
    stock.changeRates.push({stockId: stock.id, changetime: new Date(), newValue: value});
    stock.rate = value;
    this.socket.emit('changedStock', stock);
  }

  deleteStock(stockSelected: Stock): void {
    this.socket.emit('deleteStock', stockSelected);
  }
}
