import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/admin/user/user.service';

import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  urlPict = AppSettings.IMG_PROFIL;
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).pipe().subscribe({
      next: (data: User) => {
        this.editUser = data;
      },
      complete: () => console.log('ok')

    }
    )
  }
  onEdit(user: User) {

    this.userService.editUser(this.editUser.uid, user).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/admin/listUser');
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
