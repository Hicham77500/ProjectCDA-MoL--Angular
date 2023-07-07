import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAllProducts() {
    return this.http.get(AppSettings.APP_URL + '/products');
 }
 getProduct(id:number) {
  return this.http.get(AppSettings.APP_URL + '/products/'+ id);
}
}
