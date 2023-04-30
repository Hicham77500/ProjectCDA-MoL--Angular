import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { ChatCustomerService } from 'src/app/services/customer/chat-customer/chat-customer.service';
import { CommentCustomerService } from 'src/app/services/customer/comment-customer/comment-customer.service';
import { PostCustomerService } from 'src/app/services/customer/post-customer/post-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
public chat(idUser: number) {
  this.listOfChats.forEach((chat: any) => {
    
    if(chat.idUser == idUser){
      this.chatSelected = chat;
    }else{
      this.
    }
  });
}
  declare chatSelected : any;
  urlPict = AppSettings.IMG_PROFIL;
  declare listUsers: User[];
  declare listOfChats: any;
  declare userLoggedIn: User;
  declare id: number;
  private subscription: Subscription[] = [];
  ngOnInit(): void {
    this.GetUserConnected();
    this.getUsers();
  }
  constructor(
    private userCustomerService: UserCustomerService,
    private chatCustomerService: ChatCustomerService,
    
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
  public getUsers() {
  
    this.subscription.push(
      this.userCustomerService.getUsers().subscribe(
        (data: any) => {
       
          console.log(data);
          this.listUsers = data;
          this.listOfChats = data.listOfChats;
          // this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Utilisateur(s) chargé(s) avec succès`)
        },
        (err: HttpErrorResponse) => {
        
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }
}
