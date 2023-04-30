import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { User } from 'src/app/models/user';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserCustomerService {
  checkPassword(user: User) {
    return this.http.post<User | HttpErrorResponse>(AppSettings.APP_URL + '/checkPassword', user)
  }
  changePassword(user: User) {
    return this.http.post<User | HttpErrorResponse>(AppSettings.APP_URL + '/changePassword', user)
  }
  constructor(private http: HttpClient) {

  }
  public getUserByUsername(username : string){
    console.log(username);
    
    return this.http.get<User>(AppSettings.APP_URL + "/findUser/" + username);
  }
  public getUsers() {
    return this.http.get(AppSettings.APP_URL + "/listUser");
    
  }
  public getUser(id: number) {
    return this.http.get<User>(AppSettings.APP_URL + "/getUser/" + id);
  }
  public addUser(user: User) {
    console.log(user)
    return this.http.post<User | HttpErrorResponse>(AppSettings.APP_URL + '/addUser', user)
  }
  public editUser(id: number, user: User) {
    console.log(id,user)
    return this.http.put<User | HttpErrorResponse>(AppSettings.APP_URL + "/updateUser/" + id, user);
  }
  public deleteUser(id: number|null) {
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/deleteUser/" + id);
  }
  updateProfileImage(formData: FormData) {
    console.log(formData)
    return this.http.post<User | HttpErrorResponse>(AppSettings.APP_URL + '/updateProfileImage', formData)
  }
}
