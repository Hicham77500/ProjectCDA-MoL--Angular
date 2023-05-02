import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Picture } from 'src/app/models/picture';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PictureService } from 'src/app/services/admin/picture/picture.service';
import { PostService } from 'src/app/services/admin/post/post.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/admin/user/user.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public user = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  private subscription: Subscription[] = [];
  declare id: number;

  declare userLoggedIn: User;
  constructor(
    private pictureService: PictureService,
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.GetUserConnected();
  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    console.log(this.id)
    this.subscription.push(

      this.userService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
        }
      )
    )
  }
  public onAddPost(post: Post) {

    this.postService.addPost(post).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été créé avec succès")
        const formData = new FormData();
        formData.append('idPost', data.idPost.toString());
        formData.append('postImageUrl', this.pictureFile);
        this.subscription.push(
          this.postService.updatePostImage(formData).subscribe(
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
}
