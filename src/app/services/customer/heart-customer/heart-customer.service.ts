import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Heart } from 'src/app/models/heart';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class HeartCustomerService {
  constructor(private http: HttpClient) {

  }
  public getHearts() {
    return this.http.get(AppSettings.APP_URL + "/hearts");

  }
  public getHeart(id: number) {
    return this.http.get<Heart>(AppSettings.APP_URL + "/getHearts/" + id);
  }
  public addHeart(heart: Heart) { 
    console.log(heart);

    return this.http.post<Heart | HttpErrorResponse>(AppSettings.APP_URL + '/hearts', heart)
  }
  public editHeart(id: number, heart: Heart) {
    return this.http.put<Heart | HttpErrorResponse>(AppSettings.APP_URL + "/hearts/" + id, heart);
  }
  public deleteHeart(id: number|null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/hearts/" + id);
  }
}
