import {StockChange} from './stockchange.model';

export interface Stock {
  id: number;
  name: string;
  description: string;
  rate: number;
  changeRates: StockChange[];
}
