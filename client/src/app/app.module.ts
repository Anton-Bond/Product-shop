import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { AuthModule } from './auth/auth.module';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    ProductsPageComponent,
    NotFoundComponent,
    PaginationComponent,
    SiteLayoutComponent,
    OrdersPageComponent,
    OrderPageComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
