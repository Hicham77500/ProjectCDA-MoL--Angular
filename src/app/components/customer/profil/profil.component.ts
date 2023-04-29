import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';


import { AppSettings } from 'src/app/settings/app.settings';
import { PostCustomerService } from 'src/app/services/customer/post-customer/post-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { CommentCustomerService } from 'src/app/services/customer/comment-customer/comment-customer.service';
import { LikeCustomerService } from 'src/app/services/customer/like-customer/like-customer.service';

declare var window: any;
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {


  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];
  declare commentsForSelectedPost: any;
  declare id: number;
  declare public refreshing: boolean;
  declare posts: any;
  public editUser = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  declare userLoggedIn: User;
  declare selectedPost: any;
  formModal: any;
  ngOnInit(): void {
    this.GetUserConnected();
  }
  constructor(
    private userCustomerService: UserCustomerService,
    private commentCustomerService: CommentCustomerService,
    private likeCustomerService: LikeCustomerService,
    private notificationService: NotificationService

  ) {

  }
  openAndCloseComment() {
    const comment = document.getElementById('commentProfil');
    console.log(comment?.classList)
    if (comment?.classList.contains("d-none")) {
      comment?.classList.remove('d-none');
    } else {
      comment?.classList.add('d-none');
    }

  }
  closeComment() {
    const comment = document.getElementById('commentProfil');
    console.log(comment?.classList)
    if (!comment?.classList.contains("d-none")) {
      comment?.classList.add('d-none');
    } 
  }
  LikeOrUnlike(idPost : number) {
    const formData = new FormData();
    formData.append('idPost', idPost.toString());
    formData.append('idUser', this.userLoggedIn.uid.toString());
    this.subscription.push(
      this.likeCustomerService.addLike(formData).subscribe(
        (data: any) => {
          this.GetUserConnected();
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )
    )
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
  openModalPhoto(post: Post) {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalPhoto")
    );
    this.selectedPost = post;
    this.commentsForSelectedPost = post.listComments;
    this.formModal.show();
  }

  onEdit(user: User) {
    console.log(this.id, user)

    this.subscription.push(
      this.userCustomerService.editUser(this.id, user).subscribe(
        (data: any) => {
          this.GetUserConnected();
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )
    )
  }
  onComment(comment: any) {
    console.log(comment)
    this.subscription.push(
      this.commentCustomerService.addComment(comment).subscribe(
        (data: any) => {
          this.GetUserConnected();
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
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
      this.userCustomerService.updateProfileImage(formData).subscribe(
        (data: any) => {
          this.GetUserConnected();
        }
      )
    )
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
