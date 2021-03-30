import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import {Stock} from './shared/stocks.model';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [StocksComponent],
    imports: [
        CommonModule,
        StocksRoutingModule,
        ReactiveFormsModule
    ]
})
export class StocksModule {}
