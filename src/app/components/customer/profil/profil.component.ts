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
import { Heart } from 'src/app/models/heart';
import { HeartCustomerService } from 'src/app/services/customer/heart-customer/heart-customer.service';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';


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
    this.GetUserConnected();
  }
  constructor(
    private router: Router,
    private userCustomerService: UserCustomerService,
    private postCustomerService: PostCustomerService,
    private commentCustomerService: CommentCustomerService,
    private heartCustomerService: HeartCustomerService,
    private notificationService: NotificationService

  ) {

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
  changePassword(user: User) {
    this.userCustomerService.changePassword(user).subscribe(
      (data: any) => {
        console.log(data)
        this.openChangePassword();
      },
      (error: any) => {
        console.log(error);
      }

    );
  }
  sendActualPassword(user: User) {

    this.userCustomerService.checkPassword(user).subscribe(

      (data: any) => {
        console.log(data)
        this.openChangePassword();


      },
      (error: any) => {
        this.closeChangePassword();
        console.log(error);

      }

    );
  }

  onDeleteUser(id: number) {

    this.subscription.push(
      this.userCustomerService.deleteUser(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `Votre compte a été supprimé définitivement`);
          this.router.navigateByUrl("/register")
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }
  DeleteComment(id: number) {
    this.commentCustomerService.deleteComment(id).subscribe(
     ()=> console.log("cesst bobnbnbnbbnobn")
      
    )
    }
  // aimer ou enlever aime d'un post
  addHeart(heart: Heart) {
    if (this.postLikeByUser == false) {
      this.subscription.push(
        this.heartCustomerService.addHeart(heart).subscribe(
          (heart: any) => {
            this.getDataForModalPhoto(this.selectedPost.idPost);

            
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
          
        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )
    )
  }
  //modifier le profil
  onEdit(user: User) {
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




  //ajouter un commentaire
  onComment(comment: any) {
    console.log(comment)
    this.subscription.push(
      this.commentCustomerService.addComment(comment).subscribe(
        (data: any) => {
          this.GetUserConnected();
         

        },
        (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
      )


    )
  }




  // permet de modifier la photo de profil
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

  // ouvre le modal pour la configuration du profil
  openModalProfil() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalProfil")
    );
    this.formModal.show();
  }
  // ouvre le modal pour la configuration de la bio
  openModalBiography() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalBiography")
    );

    this.formModal.show();
  }

  openModalPassword() {
    this.closeChangePassword();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalResetPassword")
    );
    this.formModal.show();
  }
  openChangePassword() {
    const comment = document.getElementById('changePassword');

    comment?.classList.remove('d-none');
  }
  // modal change password pour etre sur qu'il soit fermé
  closeChangePassword() {
    const comment = document.getElementById('changePassword');
    if (!comment?.classList.contains("d-none")) {
      comment?.classList.add('d-none');
    }
  }
  openModalForDeleteUser() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModalDeleteUser")
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
