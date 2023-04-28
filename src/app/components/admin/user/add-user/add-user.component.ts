import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/admin/user/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
   
  }
  public onAddUser(user: User) {
    if(user){
      let tab:string[] = [];
      tab.push(user.role);
      user.roles = tab;
    }
    this.userService.addUser(user).subscribe(
      (data: any) => {this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été créé avec succès")
     this.router.navigateByUrl('/admin/listUser');}
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['message'])
    )


  }
}
