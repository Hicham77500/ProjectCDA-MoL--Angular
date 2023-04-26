import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { IToken } from 'src/app/interfaces/IToken';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {

  }


  public onRegister(user: User) {
    console.log(user);
    this.authenticationService.register(user).subscribe(
      () => {this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été crée avec succès")
        this.router.navigateByUrl('/login')
      },

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['message'])
    )


  }
}
