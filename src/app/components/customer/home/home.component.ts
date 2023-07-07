import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';

import { User } from 'src/app/models/user';
import { AppSettings } from 'src/app/settings/app.settings';
import { Product } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { CartService } from 'src/app/services/customer/cart/cart.service';
import { CategoryService } from 'src/app/services/customer/category/category.service';
import { ProductService } from 'src/app/services/customer/product/product.service';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public urlImage = AppSettings.APP_URL_IMG;
  declare categories: any;
  declare products: any;
  declare product: any;
  declare cartTotalItems: any;

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();

  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) 
  {

  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {

        this.categories = data;
      }
    )
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {

        this.products = data;
      }
    )
  }

  addOnCart(product: Product) {

    this.cartService.addToCart(product);
  }

  getProduct(product: any) {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        console.log(data);
        this.product = data;
      }
    )
  }
}
