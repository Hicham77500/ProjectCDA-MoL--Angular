import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Like } from 'src/app/models/like';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class LikeCustomerService {
  constructor(private http: HttpClient) {

  }
  public getLikes() {
    return this.http.get(AppSettings.APP_URL + "/likes");

  }
  public getLike(id: number) {
    return this.http.get<Like>(AppSettings.APP_URL + "/getLikes/" + id);
  }
  public addLike(formData: FormData) { 
    
    return this.http.post<Like | HttpErrorResponse>(AppSettings.APP_URL + '/likes', formData)
  }
  public editLike(id: number, like: Like) {
    return this.http.put<Like | HttpErrorResponse>(AppSettings.APP_URL + "/likes/" + id, like);
  }
  public deleteLike(id: number|null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/likes/" + id);
  }
}
