import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../shared/models/product.model';
import { ProductsService } from '../shared/services/products.service';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;
  userId = localStorage.getItem('userId');
  isAdmin: boolean = false;

  products: Product[] = [];

  // for pagination
  productsOnCurrentPage: Product[] = [];
  // total amount of items
  count: number = 0;
  // offset that is used currently
  offset: number = 0;
  // size of each page (for example = 3)
  limit: number = 3;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.productsService.fetch()
      .subscribe(products => {
        this.products = products;
        // set count of each products for cart (default = 1)
        this.products.map(p => p.count = 1);
        this.count = this.products.length;
        // set first of list products on current page
        this.productsOnCurrentPage = products.slice(0, this.limit);
        // hide 'Loading...' message
        this.isLoaded = true;
      });

      this.route.queryParams.subscribe((params: Params) => {
        if (params['isOrderSended']) {
          MaterialService.toast('Ваш заказ был отправлен.');
        }
      });

    // set admin parametr
    this.isAdmin = this.auth.isAdmin();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['deleteSuccess']) {
        MaterialService.toast('Продукт был успешно удален из базы');
      }
    })
  }

  // change list of products on current page
  onPageChange(offset) {
    this.offset = offset;
    this.productsOnCurrentPage = this.products.slice(offset, offset + this.limit);
    // reset count of each product after renew context of current page
    this.productsOnCurrentPage.map(p => p.count = 1);
  }

  addToCart(_id: String, count: number) {
    this.productsService.addToCart(this.userId, _id, count)
      .subscribe((product: Product) => {
        // reset count of each product after send data to DB
        this.productsOnCurrentPage.map(p => p.count = 1);
        if (product) {
          MaterialService.toast(`Продукт \"${product.name}\" в количестве \"${count}\" шт добавлен в корзину.`);
        } else {
          MaterialService.toast("Продукта пока нет в наличии на складе!");
        }
      });
  }

  // decrement count of products to add to cart
  decCount(idx: number) {
    this.productsOnCurrentPage[idx].count > 1 ? this.products[idx].count-- : 1;
  }

  // increment count of products to add to cart
  incCount(idx: number) {
    this.productsOnCurrentPage[idx].count++;
  }

  deleteFromList(id: String) {
    // find index product from list
    const idx = this.products.findIndex(p => p._id.toString() === id);
    if (idx === -1) {
      MaterialService.toast(`Продукт в списке не найден`)
    } else {
      // update product list and produc on current page
      this.products.splice(idx, 1);
      this.productsOnCurrentPage = this.products.slice(this.offset, this.offset + this.limit);
      this.count = this.products.length;
    }
  }
  // remove product from DB
  removeById(id: String) {
    this.productsService.removeById(id)
      .subscribe((product: Product) =>{
        this.deleteFromList(id);
        MaterialService.toast(`Продукт \"${product.name}\" удален из базы.`);
      });
  }

}
