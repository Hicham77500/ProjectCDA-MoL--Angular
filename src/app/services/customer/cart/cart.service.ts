import { Injectable, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];

  public cartTotalItem: number = 0;


  constructor() { }
  getCartProducts() {
    return this.cartItemList = JSON.parse(localStorage.getItem('cart') as any);
  }

  getCartTotalItems() {
    return JSON.parse(localStorage.getItem('cartTotalItems') as any);
  }
  getTotalAmount() {
    let amount = 0;
    this.cartItemList.forEach((element: any) => {
      amount += element.product.price * element.qty
    });
    return amount
  }
  addToCart(product: Product) {
    if (localStorage.getItem('cart')) {
      this.cartItemList = JSON.parse(localStorage.getItem('cart') as any);
      this.cartTotalItem = JSON.parse(localStorage.getItem('cartTotalItems') as any);
    }
    if (this.cartItemList.length == 0) {
      let qty = 1;
      let cartLine = { product, qty }
      this.cartItemList.push(cartLine)
      this.cartTotalItem++

    } else {
      let productExist = false;
      this.cartItemList.forEach((element: any) => {
        if (element.product.idProd == product.idProd) {
          productExist = true
          element.qty++
          this.cartTotalItem++
        }
      });
      if (!productExist) {
        let qty = 1;
        let cartLine = { product, qty }
        this.cartItemList.push(cartLine)
        this.cartTotalItem++
      }
    }
    ;
    localStorage.setItem('cart', JSON.stringify(this.cartItemList))
    localStorage.setItem('cartTotalItems', JSON.stringify(this.cartTotalItem))
  }


  increaseProduct(product: Product) {
    this.cartItemList = JSON.parse(localStorage.getItem('cart') as any);
    this.cartTotalItem = JSON.parse(localStorage.getItem('cartTotalItems') as any);

    this.cartItemList.forEach((element: any) => {
      if (element.product.idProd == product.idProd) {
        element.qty++
        this.cartTotalItem++
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItemList))
    localStorage.setItem('cartTotalItems', JSON.stringify(this.cartTotalItem))

  }
  decreaseProduct(product: Product) {
    this.cartItemList = JSON.parse(localStorage.getItem('cart') as any);
    this.cartTotalItem = JSON.parse(localStorage.getItem('cartTotalItems') as any);
    this.cartItemList.forEach((element: any) => {
      if (element.product.idProd == product.idProd) {
        if (element.qty > 1) {
          element.qty--
          this.cartTotalItem--
        } else {
          this.removeFromCart(element.product)
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItemList))
    localStorage.setItem('cartTotalItems', JSON.stringify(this.cartTotalItem))
  }

  removeFromCart(product: Product) {
    this.cartItemList = JSON.parse(localStorage.getItem('cart') as any);
    this.cartTotalItem = JSON.parse(localStorage.getItem('cartTotalItems') as any);
    let index = 0;
    this.cartItemList.forEach((element: any) => {
      if (element.product.idProd == product.idProd) {
        this.cartItemList.splice(index, 1)
        this.cartTotalItem -= element.qty;
      }
      index++;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItemList))
    localStorage.setItem('cartTotalItems', JSON.stringify(this.cartTotalItem))
  }
  deleteCart() {
    localStorage.removeItem('cart')
    localStorage.removeItem('cartTotalItems')
  }


}



