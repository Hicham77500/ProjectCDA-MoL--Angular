import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CommentCustomerService {

  constructor(private http: HttpClient) {

  }
  public addComment(comment: Comment) {

    return this.http.post<Comment | HttpErrorResponse>(AppSettings.APP_URL + '/comments', comment)
  }
  public editComment(id: number, comment: Comment) {
    return this.http.put<Comment | HttpErrorResponse>(AppSettings.APP_URL + "/comments/" + id, comment);
  }
  public deleteComment(id: number | null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/comments/" + id);
  }
}
