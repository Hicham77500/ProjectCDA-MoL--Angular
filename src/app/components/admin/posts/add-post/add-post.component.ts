import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Picture } from 'src/app/models/picture';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PictureService } from 'src/app/services/picture/picture.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public user = new User();
  declare public fileName: string;
  declare public pictureFile: File;

  constructor(
    private pictureService: PictureService,
    private postService: PostService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    const userJson : any= localStorage.getItem('userLoggedIn')
    this.user = JSON.parse(userJson);
    console.log(this.user);
  }
  public onAddPost(post: Post) {
    
    
    console.log(post,this.pictureFile)
    
    
    this.postService.addPost(post).subscribe(
      (data: any) => {this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été créé avec succès")
      const formData = new FormData();
      formData.append('idPost', data.idPost.toString());
      formData.append('pictureFile', this.pictureFile);
      this.pictureService.addPicture(formData).subscribe();
      this.router.navigateByUrl('/admin/listPost');}
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['message'])
    )


  }
  public onProfileImageChange(event:any):void{

    
    const files : File[] = event.target.files;
    let file: File = event.target.files[event.target.files.length-1] as File;

    this.fileName = file.name;
    this.pictureFile = file;
    console.log(this.fileName);

  }
}
