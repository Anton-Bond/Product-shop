import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  // for show message 'Loading...' before get data from DB
  isLoaded = false;
  // current order
  order: Order;
  orderCost: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getById(id)
      .subscribe(order => {
        this.order = order;
        this.orderCost = this.order.list.reduce((sum, p) => sum + (p.count * p.price), 0);
        // hide 'Loading...' message
        this.isLoaded = true;
      });
  }

  removeOrder(id: String) {
    this.orderService.removeById(id)
    .subscribe(() =>{
      this.router.navigate(['/orders']);
    });
  }

}
