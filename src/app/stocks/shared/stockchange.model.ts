import {Stock} from './stocks.model';

export interface StockChange {
  id: number;
  stock: Stock;
  changeTime: Date;
  newValue: number;
}
