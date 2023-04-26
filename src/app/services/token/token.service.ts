import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  declare private token: string;
  private jwtHelper = new JwtHelperService();

  constructor() {

  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token != localStorage.getItem('token'); /* || '{}' */
  }

  /* Récupère le TOKEN de la méthode loadToken() pour pouvoir l'utiliser */
  public getToken(): string {
    return this.token;
  }


  clearToken() {
    localStorage.removeItem('token');
  }

  public setRoles(role : string|null) {
   
    
    if (role =='ROLE_SUPER_ADMIN') {
      localStorage.setItem('role', role);
    }

  }
}

