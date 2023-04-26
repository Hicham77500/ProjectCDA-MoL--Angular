import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AppSettings } from 'src/app/settings/app.settings';
import { TokenService } from '../token/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  SaveUserLoggedIn(body: User | null) {
    localStorage.setItem('userLoggedIn', JSON.stringify(body));
  }
 
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient,private tokenService:TokenService) {

  }
  public register(user: User) {
    return this.http.post<User | HttpErrorResponse>(AppSettings.APP_URL + '/register', user)
  }
  public login(user: User) {
    return this.http.post<User>(AppSettings.APP_URL + '/login', user, {observe: 'response'})
  }

  public logOut() {
 
    localStorage.clear();

  }
  public validateToken(): boolean {

    const tok = this.tokenService.getToken();

    if (!this.jwtHelper.isTokenExpired(tok)) {

      localStorage.setItem('isExpired', 'false')

      return true;
    } else {
      this.logOut();
      return false;
    }

  }
  isLoggedInAsUser(){
    const token = localStorage.getItem('token');
    const isExpired = localStorage.getItem('isExpired')
    if(!!token || !!isExpired){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
  isLoggedInAsAdmin(){
    const token = localStorage.getItem('token');
    const isExpired = localStorage.getItem('isExpired')
    const admin = localStorage.getItem('role')
    if(!token || !isExpired || !admin){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
  
 
}
