import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/admin/post/post.service';

import { AppSettings } from 'src/app/settings/app.settings';
import { PostCustomerService } from 'src/app/services/customer/post-customer/post-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { CommentCustomerService } from 'src/app/services/customer/comment-customer/comment-customer.service';
import { HeartCustomerService } from 'src/app/services/customer/heart-customer/heart-customer.service';
import { Heart } from 'src/app/models/heart';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  declare idLike:any;
  formModal: any;
  declare id: number;
  declare isThisPostLikedByUserLoggedIn: boolean;
  declare userLoggedIn: User;
  declare posts: any;
  declare commentsForSelectedPost: any;
  declare selectedPost: any;
  declare public refreshing: boolean;
  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];

  ngOnInit(): void {
    this.getPosts();
    this.GetUserConnected();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalPhoto")
    );
  }
  constructor(
    private userCustomerService: UserCustomerService,
    private postCustomerService: PostCustomerService,
    private commentCustomerService: CommentCustomerService,
    private heartCustomerService: HeartCustomerService,

    private notificationService: NotificationService
  ) {
  }
  unlike() {
    this.subscription.push(
      this.heartCustomerService.deleteHeart(this.idLike).subscribe(
        () => {this.isThisPostLikedByUserLoggedIn = false
        this.isPostLikedByUserLoggedIn()}
      )
    )
  }
  like(idPost: number,idUser :number) {
    
      let heart = new Heart(idPost,idUser)
      this.subscription.push(
        this.heartCustomerService.addHeart(heart).subscribe(
          (heart : any)=> {
            this.selectedPost.listHearts.push(heart)
            this.isThisPostLikedByUserLoggedIn = true;
          }
        )
      )

    
  }
  public isPostLikedByUserLoggedIn() {
    let result = false;

    for (let index = 0; index < this.selectedPost.listHearts.length; index++) {
      if (this.selectedPost.listHearts[index].idUser == this.userLoggedIn.uid) {
        result = true;
        this.idLike = this.selectedPost.listHearts[index].idHeart

      }

    }
    this.isThisPostLikedByUserLoggedIn = result;
  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    console.log(this.id)
    this.subscription.push(

      this.userCustomerService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
        }
      )
    )
  }
  DeleteComment(id: number) {
    this.commentCustomerService.deleteComment(id).subscribe(
      () => console.log("cesst bobnbnbnbbnobn")

    )
  }
  openAndCloseComment() {
    const comment = document.getElementById('comment');
    console.log(comment?.classList)
    if (comment?.classList.contains("d-none")) {

      comment?.classList.remove('d-none');


    } else {
      comment?.classList.add('d-none');
    }

  }
  closeComment() {
    const comment = document.getElementById('comment');
    console.log(comment?.classList)
    if (!comment?.classList.contains("d-none")) {
      comment?.classList.add('d-none');

    }

  }
  openModal(post: Post) {

    this.selectedPost = post;
    this.GetCommentsSelectedPost(post);
    this.isPostLikedByUserLoggedIn();
    this.formModal.show();
  }
  public GetCommentsSelectedPost(post: Post) {
    this.commentsForSelectedPost = post.listComments
  }
  closeModal() {
    this.formModal.hide();
  }
  public getPosts() {
    this.subscription.push(
      this.postCustomerService.getPosts().subscribe(
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

  onComment(comment: any) {
    console.log(comment)
    this.subscription.push(
      this.commentCustomerService.addComment(comment).subscribe(
        (data: any) => {
          this.GetUserConnected();
          this.commentsForSelectedPost.push(data);
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )


    )
  }

}
