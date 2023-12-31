import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CommentCustomerService } from 'src/app/services/customer/comment-customer/comment-customer.service';
import { PictureCustomerService } from 'src/app/services/customer/picture-customer/picture-customer.service';
import { PostCustomerService } from 'src/app/services/customer/post-customer/post-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit{
  urlPict = AppSettings.IMG_PROFIL;
  declare public fileName: string;
  declare public pictureFile: File;
  declare userLoggedIn: User;
  private subscription: Subscription[] = [];
  declare commentsForSelectedPost: any;
  declare id: number;
  declare public refreshing: boolean;
  declare posts: any;
  constructor(
    private userCustomerService: UserCustomerService,
    private postCustomerService: PostCustomerService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }
  ngOnInit(): void {
    this.GetUserConnected();
  }
  public onAddPost(post: Post) {

    this.postCustomerService.addPost(post).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été créé avec succès")
        const formData = new FormData();
        formData.append('idPost', data.idPost.toString());
        formData.append('postImageUrl', this.pictureFile);
        this.subscription.push(
          this.postCustomerService.updatePostImage(formData).subscribe(
            (data: any) => {


            }
          )
        )



        this.router.navigateByUrl('/admin/listPost');
      }
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['message'])
    )


  }
  public onPostImageAdd(event: any): void {
    const files: File[] = event.target.files;
    let file: File = event.target.files[event.target.files.length - 1] as File;
    this.fileName = file.name;
    this.pictureFile = file;

  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    this.subscription.push(
      this.userCustomerService.getUser(this.id).subscribe(
        (data: User) => {
          this.userLoggedIn = data;
          this.posts = data.listPost;
        }
      )
    )
  }
}

