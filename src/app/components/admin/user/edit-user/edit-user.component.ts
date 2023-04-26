import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public editUser = new User() ;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).pipe().subscribe({
      next: (data: User) => {
        this.editUser = data
        console.log(this.editUser)
      },
      complete: () => console.log('ok')

    }
    )
  }
  onEdit(user: User) {
 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.editUser(id, user).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/admin');
      }
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
    )


  }

}
