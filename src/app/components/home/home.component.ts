import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Post } from 'src/app/models/post';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/post/post.service';
import { AppSettings } from 'src/app/settings/app.settings';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  formModal:any;
  declare posts: any;
  declare selectedPost:any;
  declare public refreshing: boolean;
  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );
    this.getPosts();
  }
  constructor(
    private postService: PostService,

    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  openModal(post : Post){
    this.selectedPost = post;
    this.formModal.show();
  }
  doSomething(){
    this.formModal.hide();
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

    );
  }
}
