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

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  formModal:any;
  declare id : number;
  declare userLoggedIn: User;
  declare posts: any;
  declare commentsForSelectedPost: any;
  declare selectedPost:any;
  declare public refreshing: boolean;
  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];
 
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );

    this.getPosts();
    this.GetUserConnected();
  }
  constructor(
    private userCustomerService : UserCustomerService,
    private postCustomerService: PostCustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
  }
  public GetUserConnected(){

    this.id =localStorage.getItem('userLoggedIn') as any;
    console.log(this.id)
    this.subscription.push(
      
      this.userCustomerService.getUser(this.id).subscribe(
        (data : any) => {
          this.userLoggedIn = data;
        }
      )
    )
  }  
  
  openModal(post : Post){
    this.selectedPost = post;
    this.commentsForSelectedPost = post.listComments;
    this.formModal.show();
  }
  // doSomething(){
  //   this.formModal.hide();
  // }
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
}
