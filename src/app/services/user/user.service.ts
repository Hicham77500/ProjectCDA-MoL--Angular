import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {




  constructor(private http: HttpClient) {

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
    return this.http.delete<User | HttpErrorResponse>(AppSettings.APP_URL + "/deleteUser/" + id);
  }
  public addUsersToLocalCache(users: User[]) : void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  public getUsersFromLocalCache() : User[] {

    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}