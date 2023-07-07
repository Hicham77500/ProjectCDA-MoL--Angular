import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  declare id: number;
  declare userLoggedIn: User;
  urlPict =  AppSettings.APP_URL_IMG;
  declare users: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.GetUserConnected();
    this.getUsers();
    
    
    
  }
  public getUsers() {
    this.refreshing = true;
    this.subscription.push(
      this.userService.getUsers().subscribe(
        (data: any) => {
          this.userService.addUsersToLocalCache(data);
          this.users = data;
          this.refreshing = false;
          console.log(this.users);
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Utilisateur(s) chargé(s) avec succès`)
        },
        (err: HttpErrorResponse) => {
          this.refreshing = false;
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }
  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    this.subscription.push(

      this.userService.getUser(this.id).subscribe(
        (data: any) => {
          this.userLoggedIn = data;
        }
      )
    )
  }

  onDeleteUser(id: number) {

    this.subscription.push(
      this.userService.deleteUser(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `L'utilisateur a bien été supprimé avec succes`);
          this.getUsers();
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (
        user.lastName.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.firstName.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.username.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.uid.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache()
    }
  }
}
