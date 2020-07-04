import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import { Product } from '../shared/models/product.model';
import { ProductsService } from '../shared/services/products.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  isNew = true;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      prodCode: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.productsService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (product: Product) => {
          if (product) {
            this.product = product
            this.form.patchValue({
              prodCode: product.prodCode,
              name: product.name,
              price: product.price
            })
            // MaterialService.updateTextInputs()
          }

          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  // remove product from DB
  removeById() {
    this.productsService.removeById(this.product._id)
      .subscribe(() => this.router.navigate(['/products'], {
        queryParams: {
          deleteSuccess: true
        }
      }));
  }

  onSubmit() {
    this.form.disable()

    if (this.isNew) {
      this.productsService.create(this.form.value)
        .subscribe(() =>  MaterialService.toast('Изменения сохранены.'));
    } else {
      this.productsService.update(this.product._id, this.form.value)
        .subscribe(() => MaterialService.toast('Изменения сохранены.'));
    }
    this.form.enable();
  }

}
