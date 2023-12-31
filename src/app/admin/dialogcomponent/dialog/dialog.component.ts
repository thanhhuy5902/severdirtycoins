import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/ngrx/states/products.state';
import { Products } from 'src/app/models/products.model';
import * as ProductsActions from '../../../ngrx/actions/products.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Products,
    private store: Store<{ product: ProductsState; idToken: AuthState }>
  ) {
    console.log(this.product);
  }
  idToken$ = this.store.select('idToken', 'idToken');
  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      imgUrl: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
    });
  }
  updateProduct(product: Products) {
    product._id = this.product._id;
    if (!product.imgUrl) {
      product.imgUrl = this.product.imgUrl;
    }
    if (!product.price) {
      product.price = this.product.price;
    }
    if (!product.name) {
      product.name = this.product.name;
    }
    if (!product.quality) {
      product.quality = this.product.quality;
    }
    if (!product.description) {
      product.description = this.product.description;
    }
    this.idToken$.subscribe((value) => {
      console.log(value);

      if (value) {
        console.log('làm đúng r' + value);
        this.store.dispatch(
          ProductsActions.updateProduct({ product, idToken: value })
        );
      }
    });
  }
}
