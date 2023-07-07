import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { CartService } from 'src/app/services/customer/cart/cart.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterContentChecked {
  declare userLoggedIn: boolean;
  private subscription: Subscription[] = [];
  declare userAdmin: any;
  declare id: number;
  declare cartTotalItems: number | null;

  ngOnInit(): void {

    this.userLoggedIn = this.isUserLoggedIn();
    this.userAdmin = this.authenticationService.isLoggedInAsAdmin()
  }

  constructor(
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private userCustomerService: UserCustomerService,

    // private notificationService : NotificationService
  ) {

  }
  ngAfterContentChecked(): void {

    this.getCartTotalItems();
    this.userLoggedIn = this.isUserLoggedIn();
  }

 public isUserLoggedIn(){
  if(localStorage.getItem('userLoggedIn')){
    return true
  }
  return false
 }
  getCartTotalItems() {
    this.cartTotalItems = this.cartService.getCartTotalItems()
  }

  logout(){
    
    this.authenticationService.logOut()
  }
}

