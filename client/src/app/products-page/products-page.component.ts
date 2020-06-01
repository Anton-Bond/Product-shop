import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/models/product.model';
import { ProductsService } from '../shared/services/products.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;

  products: Product[] = [];

  productsOnCurrentPage: Product[] = [];
  // total amount of items
  count: number = 0;
  // offset that is used currently
  offset: number = 0;
  // size of each page
  limit: number = 5;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.fetch()
      .subscribe(products => {
        this.products = products;
        this.count = this.products.length;
        this.productsOnCurrentPage = products.slice(0, this.limit);
        // hide 'Loading...' message
        this.isLoaded = true;
      });

  }


  onPageChange(offset) {
    this.offset = offset;
    this.productsOnCurrentPage = this.products.slice(offset, offset + this.limit);
  }

  addToCart(_id: String) {
    this.productsService.addToCart(_id)
      .subscribe((product: Product) => {
        MaterialService.toast(`Продукт \"${product.name}\" добавлен в корзину.`);
      });
  }

}
