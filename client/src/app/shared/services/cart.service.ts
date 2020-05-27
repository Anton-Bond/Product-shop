import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  urlServer = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // get all products of cart from DB
  fetch(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.urlServer}/cart`);
  }

  delete(id: String) {
    return this.http.delete(`${this.urlServer}/cart/${id}`);
  }

}
