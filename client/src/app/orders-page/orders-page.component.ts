import { Component, OnInit } from '@angular/core';

import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/order.model';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;
  // all orders
  orders: Order[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.fetch()
      .subscribe(orders => {
        this.orders = orders;
        // hide 'Loading...' message
        this.isLoaded = true;
      });
  }

  // total cost for each order
  orderCost(list): number {
    return list.reduce((sum, p) => sum + (p.count * p.price), 0);
  }

  deleteOrderFromList(id: String) {
    // find index order from list
    const idx = this.orders.findIndex(order => order._id = id);
    if (idx === -1) {
      MaterialService.toast(`Заказ в списке не найден`)
    } else {
      this.orders.splice(idx, 1);
    }
  }

  // remove order by id from DB
  removeOrder(id: String) {
    this.orderService.removeById(id)
      .subscribe((order: Order) =>{
        this.deleteOrderFromList(order._id);
        MaterialService.toast(`Заказ № \"${order.orderNum}\" удален из базы.`);
      });

  }

}
