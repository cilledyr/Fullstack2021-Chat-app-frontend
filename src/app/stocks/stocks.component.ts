import { Component, OnInit } from '@angular/core';
import {StocksService} from './shared/stocks.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Stock} from './shared/stocks.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  unsubscriber = new Subject();
  allStocks: Stock[] = [];
  stockSelected: Stock |undefined;
  newRateFC = new FormControl('');

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.stocksService.listenForStocks()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(stocks => {
        console.log('heloooooo');
        this.allStocks = stocks;
        this.stockSelected = this.allStocks[2];
      });

  }

  changeRate(): void {
    const theRate = parseFloat(this.newRateFC.value);
    if (this.stockSelected !== undefined && theRate)
    {
      console.log(this.newRateFC.value);
      this.stocksService.changeStock(theRate, this.stockSelected);
    }

  }

  deleteStock(): void {
    if (this.stockSelected !== undefined)
    {
      console.log(this.stockSelected.name + ' will be deleted.');
      this.stocksService.deleteStock(this.stockSelected);
      this.stockSelected = undefined;
    }

  }

  selectStock(id: number): void {
    const theStock = this.allStocks.find(stock => stock.id === id);
    this.stockSelected = theStock;
  }
}
