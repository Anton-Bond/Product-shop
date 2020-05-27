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

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.fetch()
      .subscribe(products => {
        this.products = products;
        // hide 'Loading...' message
        this.isLoaded = true;
      });
  }

  addToCart(_id: String) {
    this.productsService.addToCart(_id)
      .subscribe((product: Product) => {
        MaterialService.toast(`Продукт \"${product.name}\" добавлен в корзину.`);
      });
  }

}
