import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Message } from 'src/app/models/message';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class MessageCustomerService {

  constructor(private http: HttpClient) {

  }
  public addMessage(message: Message) {

    return this.http.post<Message | HttpErrorResponse>(AppSettings.APP_URL + '/messages', message)
  }
  public editMessage(id: number, message: Message) {
    return this.http.put<Message | HttpErrorResponse>(AppSettings.APP_URL + "/messages/" + id, message);
  }
  public deleteMessage(id: number | null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/messages/" + id);
  }
}
