import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from 'src/app/models/orders';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(AppSettings.APP_URL + '/orders');
  }
  public getOrder(id: number) {
    return this.http.get<Orders>(AppSettings.APP_URL + "/orders/" + id);
  }
  public addOrder(orders: Orders) {
    return this.http.post<Orders | HttpErrorResponse>(AppSettings.APP_URL + '/orders', orders)
  }
  public addOrdersToLocalCache(orderss: Orders[]): void {
    localStorage.setItem('orders', JSON.stringify(orderss));
  }
  public getOrdersFromLocalCache(): Orders[] {

    if (localStorage.getItem('orders')) {
      return JSON.parse(localStorage.getItem('orders')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}
