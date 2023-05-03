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

  }
  constructor(
    private userCustomerService: UserCustomerService,
    private messageCustomerService: MessageCustomerService,
  ) {
  }
  OpenChat(chat: Chat) {
    this.userCustomerService.getUser(chat.idOtherUser).subscribe(
      (user: User) => {
        this.userSelected = user;
        console.log(user);

      }
    )
    this.chatSelected = chat;
    this.messageChatSelected = chat.listMessages;
    console.log(this.chatSelected);
    console.log(this.messageChatSelected);

  }
  
  onAddMessage(message: Message) {
    console.log(message);
    console.log(this.chatSelected)
    
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
    console.log(this.id)
    this.subscription.push(
      this.userCustomerService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
          this.listOfChats = data.listChat;

        }
      )
    )
  }

}
