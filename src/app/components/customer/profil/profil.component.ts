import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/admin/post/post.service';
import { UserService } from 'src/app/services/admin/user/user.service';

import { AppSettings } from 'src/app/settings/app.settings';

declare var window:any;
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];

  declare id : number;
  declare public refreshing: boolean;
  declare posts: any;
  public editUser = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  declare userLoggedIn: User;
  declare selectedPost:any;
  formModal:any;
  ngOnInit(): void {
    this.getPosts();
    this.id = this.userLoggedIn.uid;
  }
  constructor(
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
    
  ) {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn') as any);
  }
  openModalProfil() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalProfil")
    );
    this.formModal.show();
    }
    openModalBiography() {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("myModalBiography")
      );
      
      this.formModal.show();
      }
  openModalPhoto(post : Post){
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalPhoto")
    );
    this.selectedPost = post;
    this.formModal.show();
  }

  onEdit(user: User) {
    console.log(this.id,user)
    
    this.subscription.push(
    this.userService.editUser(this.id, user).subscribe(
      (data: any) => {
        // this.authenticationService.SaveUserLoggedIn(data)
        this.userLoggedIn = data;
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
       
      },
      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
    )
    )
  }
  public getPosts() {

    this.subscription.push(
      this.postService.getPosts().subscribe(
        (data: any) => {
          this.posts = data;
        },
        (err: HttpErrorResponse) => {
          this.refreshing = false;
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])
        }
      )
    )
  }
  public onProfileImageChange(event: any, username: string): void {
    console.log(this.pictureFile)
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
          console.log(data)
          
          // this.authenticationService.SaveUserLoggedIn(data)
          this.userLoggedIn = data;
          
        }
      )
    )
  }

}
