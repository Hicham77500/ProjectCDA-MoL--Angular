import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ChatCustomerService {
  constructor(private http: HttpClient) {

  }
  public addChat(chat: Chat) {

    return this.http.post<Chat | HttpErrorResponse>(AppSettings.APP_URL + '/chats', chat)
  }
  public editChat(id: number, chat: Chat) {
    return this.http.put<Chat | HttpErrorResponse>(AppSettings.APP_URL + "/chats/" + id, chat);
  }
  public deleteChat(id: number | null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/comments/" + id);
  }
}
