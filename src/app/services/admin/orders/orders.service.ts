import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
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

  public addOrders(orders: Orders) {
    console.log(orders)
    return this.http.post<Orders | HttpErrorResponse>(AppSettings.APP_URL + '/admin/addOrders', orders)
  }
  public editOrders(id: number, orders: Orders) {
    console.log(id,orders)
    return this.http.put<Orders | HttpErrorResponse>(AppSettings.APP_URL + "/admin/updateOrders/" + id, orders);
  }
  public deleteOrders(id: number|null) {
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/admin/deleteOrders/" + id);
  }




  public addOrdersToLocalCache(orderss: Orders[]) : void {
    localStorage.setItem('orders', JSON.stringify(orderss));
  }
  public getOrdersFromLocalCache() : Orders[] {

    if (localStorage.getItem('orders')) {
      return JSON.parse(localStorage.getItem('orders')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}
