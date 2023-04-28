import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  declare userLoggedIn: any;
  declare userAdmin: any;
  
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.userLoggedIn = localStorage.getItem('userLoggedIn');
    this.userAdmin = this.authenticationService.isLoggedInAsAdmin();
  }
}
