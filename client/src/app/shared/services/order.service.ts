import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlServer = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // get all orders from DB
  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.urlServer}/orders`);
  }

  // save order from cart page
  createOrder(order: Order) {
    return this.http.post(`${this.urlServer}/cart`, order, this.httpOptions);
  }

  // get order by Id
  getById(id: String): Observable<Order> {
    return this.http.get<Order>(`${this.urlServer}/orders/${id}`);
  }

  // delete order by Id
  removeById(id: String) {
    return this.http.delete(`${this.urlServer}/orders/${id}`);
  }
}
