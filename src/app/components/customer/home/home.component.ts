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

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
seeProfil(arg0: { "": any; }) {
throw new Error('Method not implemented.');
}

  formModal: any;
  declare id: number;

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
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
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
  openAndCloseComment() {
    const comment = document.getElementById('comment');
    console.log(comment?.classList)
    if (comment?.classList.contains("d-none") ) {
  
      comment?.classList.remove('d-none');
    
    
    }else{
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
    this.commentsForSelectedPost = post.listComments;
    this.formModal.show();
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
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )


    )
  }
}
