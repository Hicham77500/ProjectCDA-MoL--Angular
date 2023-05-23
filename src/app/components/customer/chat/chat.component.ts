import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChatCustomerService } from 'src/app/services/customer/chat-customer/chat-customer.service';
import { MessageCustomerService } from 'src/app/services/customer/message-customer/message-customer.service';
import { UserCustomerService } from 'src/app/services/customer/user-customer/user-customer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
onSearch(username: string) {
  let test = Object.values(username)
this.userCustomerService.getUserByUsername(username).subscribe(
  (data : any) => {
    console.log(data)
  }
)
}
  
  declare users : any;
  declare userSelected: any;
  declare messageChatSelected: any;
  declare chatSelected: any;
  urlPict = AppSettings.IMG_PROFIL;
  declare listUsers: User[];
  declare listOfChats: any;
  declare listOfUsernamerFromListOfChats: any;
  declare userLoggedIn: User;
  declare id: number;
  private subscription: Subscription[] = [];

  ngOnInit(): void {
    this.GetUserConnected();
    this.getUsers();
  }
  constructor(
    private userCustomerService: UserCustomerService,
    private messageCustomerService: MessageCustomerService,
    private notificationService : NotificationService
  ) {
  }
  OpenChat(chat: Chat) {
    console.log(chat);
    
    this.userCustomerService.getUser(chat.idOtherUser).subscribe(
      (user: User) => {
        console.log(user);
        
        this.userSelected = user;

      }
    )
    this.chatSelected = chat;
    this.messageChatSelected = chat.listMessages;


  }
  
  onAddMessage(message: Message) {
    console.log(message);
    
    this.subscription.push(
      this.messageCustomerService.addMessage(message).subscribe(
        (data : any) => {

          this.messageChatSelected.push(data);
          
        }
      )
    )
  }
  public GetUserConnected() {
    this.id = localStorage.getItem('userLoggedIn') as any;
    this.subscription.push(
      this.userCustomerService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
          this.listOfChats = data.listChat;

        }
      )
    )
  }
  public getUsers() {

    this.subscription.push(
      this.userCustomerService.getUsers().subscribe(
        (users: any) => {
          
          this.users = users;
          
          
        },
        (err: HttpErrorResponse) => {
          
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }
}
