import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { ProductComponent } from './product/product.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    ProductsPageComponent,
    NotFoundComponent,
    PaginationComponent,
    SiteLayoutComponent,
    ProductComponent,
    OrderPageComponent,
    OrdersPageComponent
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
