
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { IToken } from 'src/app/interfaces/IToken';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TokenService } from 'src/app/services/token/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {

  }
  ngOnInit(): void {
    this.authenticationService.logOut()

  }

  public onLogin(user: User) {


    this.authenticationService.login(user).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response)
        console.log(response.headers.get(HeaderType.JWT_TOKEN));
        if (response.headers.get(HeaderType.JWT_TOKEN)) {
          let token: any;
          token = response.headers.get(HeaderType.JWT_TOKEN);
          this.tokenService.saveToken(token);
          this.authenticationService.validateToken(); 
          this.tokenService.setRoles(response.body!.role);
          this.authenticationService.SaveUserLoggedIn(response.body);
        }

      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.notify(NotificationType.ERROR, err.error['message'])
      },

      complete: () => {

        this.router.navigateByUrl("/admin")


      }

    })

  }

}
