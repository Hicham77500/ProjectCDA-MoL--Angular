import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Heart } from 'src/app/models/heart';
import { User } from 'src/app/models/user';
import { CommentCustomerService } from 'src/app/services/customer/comment-customer/comment-customer.service';
import { HeartCustomerService } from 'src/app/services/customer/heart-customer/heart-customer.service';
import { PostCustomerService } from 'src/app/services/customer/post-customer/post-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';
declare var window: any;
@Component({
  selector: 'app-profil-visit',
  templateUrl: './profil-visit.component.html',
  styleUrls: ['./profil-visit.component.css']
})
export class ProfilVisitComponent implements OnInit{
DeleteComment(id: number) {
this.commentCustomerService.deleteComment(id).subscribe(
 ()=> console.log("cesst bobnbnbnbbnobn")
  
)
}


  declare actualProfil : any;
  urlPict = AppSettings.IMG_PROFIL;
  private subscription: Subscription[] = [];
  declare commentsForSelectedPost: any;
  declare id: number;
  declare idHeart: number;
  declare public refreshing: boolean;
  declare postLikeByUser: boolean;
  declare posts: any;
  declare heartsForSelectPost: any;
  public editUser = new User();
  declare public fileName: string;
  declare public pictureFile: File;
  declare userLoggedIn: User;
  declare selectedPost: any;
  formModal: any;
  
  ngOnInit(): void {
    const username = String(this.route.snapshot.paramMap.get('username'));
    this.getDataForProfile(username);

    this.GetUserConnected();
  }
  constructor(

     private router: Router,
    private route: ActivatedRoute,
    private userCustomerService: UserCustomerService,
    private postCustomerService: PostCustomerService,
    private commentCustomerService: CommentCustomerService,
    private heartCustomerService: HeartCustomerService,
    private notificationService: NotificationService

  ) {

  }
  public getDataForProfile(username :string){
    console.log(username);
    
    this.subscription.push(
    this.userCustomerService.getUserByUsername(username).subscribe(
      (data: User) => { 
        this.actualProfil = data;
        this.posts = data.listPost;
      }
    )
    )  
    
  }
  // permet de savoir quel utilisateur est connecté
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

  // aimer ou enlever aime d'un post
  addHeart(heart: Heart) {
    if (this.postLikeByUser == false) {
      this.subscription.push(
        this.heartCustomerService.addHeart(heart).subscribe(
          (heart: any) => {
            this.getDataForModalPhoto(this.selectedPost.idPost);

            this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
          },
          (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
        )
      )
    }
  }

  // ouvre le modal pour la view du post
  openModalPhoto(idPost: number) {


    this.getDataForModalPhoto(idPost);
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalPhoto")
    );
    this.formModal.show();
  }

  // récupérer les données nécessaire pour le chargement du modal
  getDataForModalPhoto(idPost: number) {
    this.getPostById(idPost);
    this.commentsForSelectedPost = this.selectedPost.listComments;
    this.heartsForSelectPost = this.selectedPost.listHearts;
    this.postLikeByUser = this.isPostLikeByUser(this.heartsForSelectPost);
  }
  isPostLikeByUser(heartsForSelectPost: any): boolean {
    for (let index = 0; index < heartsForSelectPost.length; index++) {
      if (heartsForSelectPost[index].idUser == this.userLoggedIn.uid) {
        return true;
      }
    }
    return false;
  };



  // récupérer le post pour le modal
  getPostById(idPost: number) {
    this.subscription.push(
      this.postCustomerService.getPost(idPost).subscribe(
        (data: any) => {
          this.selectedPost = data;
          this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )
    )
  }
  
  //ajouter un commentaire
  onComment(comment: any) {
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

  // ouvre le modal pour la configuration du profil
  openModalProfil() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalProfil")
    );
    this.formModal.show();
  }
 
  //open and close comment part of the modal
  openAndCloseComment() {
    const comment = document.getElementById('commentProfil');
    if (comment?.classList.contains("d-none")) {
      comment?.classList.remove('d-none');
    } else {
      comment?.classList.add('d-none');
    }
  }
  // modal part comment close at the opening for sure
  closeComment() {
    const comment = document.getElementById('commentProfil');
    if (!comment?.classList.contains("d-none")) {
      comment?.classList.add('d-none');
    }
  }

}
