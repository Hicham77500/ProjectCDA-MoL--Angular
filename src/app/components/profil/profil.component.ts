import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  declare public refreshing: boolean;
  declare posts: any;
  urlPict = AppSettings.IMG_PROFIL;
  public editUser = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  private subscription: Subscription[] = [];
  declare userLoggedIn: User;
  declare selectedPost:any;
  formModal:any;
  ngOnInit(): void {
    this.getPosts();
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
  openModal(post : Post){
    this.selectedPost = post;
    this.formModal.show();
  }
  doSomething(){
    this.formModal.hide();
  }
  onEdit(user: User) {
    this.userService.editUser(this.userLoggedIn.uid, user).subscribe(
      (data: any) => {
        this.userLoggedIn = data;
        this.authenticationService.SaveUserLoggedIn(data)
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/admin');
      },
      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
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
          
          this.userLoggedIn = data;
          this.authenticationService.SaveUserLoggedIn(data)
          
        }
      )
    )
  }

}
