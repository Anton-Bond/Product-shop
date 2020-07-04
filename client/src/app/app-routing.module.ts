import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPageComponent } from './products-page/products-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AdminGuard } from './shared/services/admin.guard';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'products', component: ProductsPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'orders', component: OrdersPageComponent, canActivate: [AdminGuard] },
    { path: 'orders/:id', component: OrderPageComponent, canActivate: [AdminGuard] },
    { path: 'product/new', component: ProductComponent, canActivate: [AdminGuard] },
    { path: 'product/:id', component: ProductComponent, canActivate: [AdminGuard] }
  ]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
