import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
onSearch(username: string) {
  console.log(Object.values(username))
  this.router.navigateByUrl("/profil/"+Object.values(username))
}

  declare userLoggedIn: any;
  declare userAdmin: any;
  private subscription: Subscription[] = [];
  declare id: number;
  declare users: any;
  ngOnInit(): void {
    
    this.GetUserConnected();
    this.getUsers();
  }
  constructor(
    private router : Router,
    private authenticationService: AuthenticationService,
    private userCustomerService : UserCustomerService,
    private notificationService : NotificationService
  ) {
   
    this.userAdmin = this.authenticationService.isLoggedInAsAdmin();
  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    console.log(this.id)
    this.subscription.push(

      this.userCustomerService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
        }
      )
    )
  }
  public getUsers() {

    this.subscription.push(
      this.userCustomerService.getUsers().subscribe(
        (data: any) => {
         
          this.users = data;
          
        
          
        },
        (err: HttpErrorResponse) => {
          
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }

}
