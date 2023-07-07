import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  urlPict = AppSettings.APP_URL_IMG;
  declare id: number;
  public editUser = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  private subscription: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
   this.GetUserConnected()
  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    this.subscription.push(

      this.userService.getUser(this.id).subscribe(
        (data: any) => {
          this.editUser = data;
        }
      )
    )
  }
  onEdit(user: User) {
console.log(user);

    this.userService.editUser(this.editUser.uid, user).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/profile');
      }
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
    )


  }
  public onProfileImageChange(event: any, username: string): void {
    const files: File[] = event.target.files;
    let file: File = event.target.files[event.target.files.length - 1] as File;
    this.fileName = file.name;
    this.pictureFile = file;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('profileImage', this.pictureFile);
    this.subscription.push(
    this.userService.updateProfileImage(formData).subscribe(
      (data: any) => {
        
     
      }
    )
    )
  }
}
