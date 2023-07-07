import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Product } from 'src/app/models/product';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  public getProducts() {
    return this.http.get(AppSettings.APP_URL + "/products");

  }
  public getProduct(id: number) {
    return this.http.get<Product>(AppSettings.APP_URL + "/products/" + id);
  }
  public addProduct(product: Product) {
    console.log(product)
    return this.http.post<Product | HttpErrorResponse>(AppSettings.APP_URL + '/products', product)
  }
  public editProduct(id: number, product: Product) {
    console.log(id,product)
    return this.http.put<Product | HttpErrorResponse>(AppSettings.APP_URL + "/products/" + id, product);
  }
  public deleteProduct(id: number|null) {
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/products/" + id);
  }
  updateProductImage(formData: FormData) {
    console.log(formData)
    return this.http.post<Product | HttpErrorResponse>(AppSettings.APP_URL + '/admin/updateProductImage', formData)
  }



  public addProductsToLocalCache(products: Product[]) : void {
    localStorage.setItem('products', JSON.stringify(products));
  }
  public getProductsFromLocalCache() : Product[] {

    if (localStorage.getItem('products')) {
      return JSON.parse(localStorage.getItem('products')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}
