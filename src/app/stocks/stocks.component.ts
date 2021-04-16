import { Component, OnInit } from '@angular/core';
import {StocksService} from './shared/stocks.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Stock} from './shared/stocks.model';
import {FormControl} from '@angular/forms';
import {StorageService} from '../shared/storage.service';

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

  constructor(private stocksService: StocksService, private storageService: StorageService) { }

  ngOnInit(): void{
    const stocksStorage =  this.storageService.loadStocks();
    if (stocksStorage)
    {
      this.allStocks = stocksStorage;
    }
    this.stocksService.listenForStocks()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(stocks => {
        console.log('heloooooo');
        this.allStocks = stocks;
        this.storageService.saveStocks(stocks);
        this.stockSelected = this.allStocks[0];
      });

  }

  changeRate(): void {
    const theRate = parseInt(this.newRateFC.value);
    if (this.stockSelected !== undefined && theRate !== undefined)
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
