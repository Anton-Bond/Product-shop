import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlServer = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // get all products from DB
  fetch(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlServer}/products`);
  }

  addToCart(userId: String, productId: String, count: number) {
    return this.http.post(`${this.urlServer}/orders`, {userId: userId, productId: productId, count: count}, this.httpOptions);
  }

  // get product by Id
  getById(id: String): Observable<Product> {
    return this.http.get<Product>(`${this.urlServer}/products/${id}`);
  }

  // add to DB new product
  create(product: Product) {
    return this.http.post<Product>(`${this.urlServer}/products`, product, this.httpOptions);
  }

  // update in product of DB
  update(id: String, product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.urlServer}/products/${id}`, product, this.httpOptions);
  }

  // delete product from DB
  removeById(id: String) {
    return this.http.delete(`${this.urlServer}/products/${id}`);
  }

}
