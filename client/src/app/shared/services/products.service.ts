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

  addToCart(id: String) {
    return this.http.post(`${this.urlServer}/products`, {id: id}, this.httpOptions);
  }

}
