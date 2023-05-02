import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { PictureService } from 'src/app/services/admin/picture/picture.service';
import { PostService } from 'src/app/services/admin/post/post.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
  urlPict = AppSettings.IMG_PROFIL;
  public editPost = new Post();
  declare public fileName: string;
  declare public pictureFile: File;
  private subscription: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private pictureService: PictureService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe({
      next: (data: Post) => {
        this.editPost = data;
        console.log(data)
      },
      complete: () => console.log('ok')

    }
    )
  }
  onEdit(post: Post) {
    console.log(post)
    this.postService.editPost(this.editPost.idPost, post).subscribe(
      (data: any) => {

        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/admin/listPost');
      }
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
    )


  }
   public onPostImageChange(event: any, idPost: number): void {
    const files: File[] = event.target.files;
    let file: File = event.target.files[event.target.files.length - 1] as File;
    this.fileName = file.name;
    this.pictureFile = file;
    const formData = new FormData();
    formData.append('idPost', idPost.toString());
    formData.append('postImageUrl', this.pictureFile);
    this.subscription.push(
    this.postService.updatePostImage(formData).subscribe(
      (data: any) => {
        console.log(data);
        
        
      }
    )
    )
  }
}
