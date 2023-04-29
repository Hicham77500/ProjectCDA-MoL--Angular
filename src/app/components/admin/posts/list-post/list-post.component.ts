import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Post } from 'src/app/models/post';

import { NotificationService } from 'src/app/services/notification/notification.service';
import { PictureService } from 'src/app/services/admin/picture/picture.service';
import { PostService } from 'src/app/services/admin/post/post.service';

import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  urlPict = AppSettings.IMG_PROFIL;
  declare pictures: any;
  declare posts: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private postService: PostService,
    private pictureService: PictureService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.pictures = this.pictureService.getPictures()
  }
  ngOnInit(): void {

    this.getPosts();



  }
  public getPosts() {
    this.refreshing = true;
    this.subscription.push(
      this.postService.getPosts().subscribe(
        (data: any) => {
          this.postService.addPostsToLocalCache(data);
          this.posts = data;
          this.refreshing = false;
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Post(s) chargé(s) avec succès`)
        },
        (err: HttpErrorResponse) => {
          this.refreshing = false;
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }
  onDeletePost(id: number) {

    this.subscription.push(
      this.postService.deletePost(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `L'utilisateur a bien été supprimé avec succes`);
          this.getPosts();
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  } 
  public searchPosts(searchTerm: string): void {
    const results: Post[] = [];
    for (const post of this.postService.getPostsFromLocalCache()) {
      if (
        post.idPost.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        post.idUser.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(post);
      }
    }
    this.posts = results;
    if (results.length === 0 || !searchTerm) {
      this.posts = this.postService.getPostsFromLocalCache()
    }
  }
}
