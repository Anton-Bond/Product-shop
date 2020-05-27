import { Component, OnInit } from '@angular/core';

import { Cart } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;

  cart: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // initialize product of cart from DB
    this.cartService.fetch()
      .subscribe(cart => {
        this.cart = cart;
        // hide 'Loading...' message
        this.isLoaded = true;
      });
  }

  deleteFromCart(_id: String) {
    // delete product and update cart
    const idx = this.cart.findIndex(c => c._id === _id);
    if (this.cart[idx].count > 1) {
      this.cart[idx].count--;
    } else {
      this.cart.splice(idx, 1);
    }
    this.cartService.delete(_id)
      .subscribe((prodCart: Cart) => {
        MaterialService.toast(`Продукт \"${prodCart.productId.name}\" удален из корзины.`);
      });
  }

  // to calculate the cost
  mult(x: number, y: number): number {
    return x * y;
  }

}
