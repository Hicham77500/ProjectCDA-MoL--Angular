import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  declare users: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {

    this.getUsers();
    if (this.route.snapshot.paramMap.get('id') != null) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.remove(id);
    }

  }
  public getUsers() {
    this.refreshing = true;
    this.subscription.push(
      this.userService.getUsers().subscribe(
        (data: any) => {
          this.userService.addUsersToLocalCache(data);
          this.users = data;
          this.refreshing = false;
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Utilisateur(s) chargé(s) avec succès`)
        },
        (err: HttpErrorResponse) => {
          this.refreshing = false;
          this.notificationService.notify(NotificationType.ERROR, err.error['messsage'])

        }

      )

    );
  }
  remove(id: number) {

    this.subscription.push(
      this.userService.deleteUser(id).subscribe(
        () => {
          this.notificationService.notify(NotificationType.SUCCESS, `L'utilisateur a bien été supprimé avec succes`);
          this.router.navigateByUrl('admin')

        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error['message']);
        }
      )
    )
  }
  public searchUsers(searchTerm: string): void {
    // console.log(searchTerm);

    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstname.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.lastname.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.username.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        ||
        user.uid.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase())!== -1

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
