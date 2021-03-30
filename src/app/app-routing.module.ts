import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chats', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'stocks', loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
