import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';
import { MaterialService } from '../shared/classes/material.service';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderList } from '../shared/models/order.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;
  totalSum = 0;
  cart: Cart[] = [];

  // for pagination
  cartOnCurrentPage: Cart[] = [];
  // total amount of items
  count: number = 0;
  // offset that is used currently
  offset: number = 0;
  // size of each page (for example = 3)
  limit: number = 3;

  // current user id
  userId: String  = localStorage.getItem('userId');

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    // initialize product of cart from DB
    this.cartService.fetch(this.userId)
      .subscribe(cart => {
        if (cart) {
          this.cart = cart;
          this.totalSum = this.result(cart);
          this.count = this.cart.length;
          // set first of list products on current page
          this.cartOnCurrentPage = cart.slice(0, this.limit);
        }
        // hide 'Loading...' message
        this.isLoaded = true;
      });
  }

  // change list of products on current page
  onPageChange(offset) {
    this.offset = offset;
    this.cartOnCurrentPage = this.cart.slice(offset, offset + this.limit);
  }

  deleteFromCart(_id: String) {
    // delete product and update cart
    const idx = this.cart.findIndex(c => c.productId._id === _id);
    if (idx === -1) {
      MaterialService.toast('Продукт не наден в корзине.');
    } else {
      // for output message in toast about delete product
      const prodName = this.cart[idx].productId.name;
      if (this.cart[idx].count > 1) {
        // reduce the amount of product if more than one
        this.cart[idx].count--;
        // recalculation of the final price
        this.totalSum = this.result(this.cart);
      } else {
        // if count of product equal 1, delete position
        this.cart.splice(idx, 1);
        // renew current pages view
        this.cartOnCurrentPage = this.cart.slice(this.offset, this.offset + this.limit);
        this.count = this.cart.length;
        // recalculation of the final price
        this.totalSum = this.result(this.cart);
      }
      // delete from DB
      this.cartService.deleteProd(this.userId, _id)
        .subscribe(() => {
          MaterialService.toast(`Продукт \"${prodName}\" 1 шт удален из корзины.`);
        });
    }
  }

  // to calculate the cost
  mult(x: number, y: number): number {
    return x * y;
  }

  result(arr: Cart[]): number {
    return arr.reduce((sum, c) => sum + (c.count * c.productId.price), 0);
  }

  onSubmit() {
    // create order list of user for DB
    const list: OrderList[] = this.cart.map(c => {
      return {
        name: c.productId.name,
        price: c.productId.price,
        count: c.count
      }
    });

    const order = new Order(this.userId, list);
    // clear cart
    this.cartService.deleteAll(this.userId).subscribe(data => data);
    // send to server
    this.orderService.createOrder(order)
      .subscribe(() => {
        this.router.navigate(['/products'], {
          queryParams: {
            isOrderSended: true
          }
        })
      });
  }

}
