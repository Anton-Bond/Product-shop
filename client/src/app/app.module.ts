import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    ProductsPageComponent,
    NotFoundComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
