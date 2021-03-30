import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// const config: SocketIoConfig = {url: 'http://localhost:4100', options: {} }
@Injectable()
export class ChatSocket extends Socket {

  constructor() {
    super({ url: 'http://localhost:4100', options: {} });
  }

}

@Injectable()
export class StocksSocket extends Socket {

  constructor() {
    super({ url: 'http://localhost:4110', options: {} });
  }

}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ChatSocket, StocksSocket],
  bootstrap: [AppComponent]
})
export class AppModule { }
