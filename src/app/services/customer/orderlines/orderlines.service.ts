import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderLine } from 'src/app/models/orderLine';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class OrderlinesService {

  constructor(private http: HttpClient) { }
  public addOrderLines(orderLines: OrderLine) {
    return this.http.post<OrderLine | HttpErrorResponse>(AppSettings.APP_URL + '/orderLines', orderLines)
  }
}
