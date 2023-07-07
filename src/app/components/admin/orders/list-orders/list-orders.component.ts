import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Orders } from 'src/app/models/orders';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/admin/user/user.service';
import { OrdersService } from 'src/app/services/admin/orders/orders.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {
  declare id: number;
  declare userLoggedIn: User;
  urlPict = AppSettings.APP_URL_IMG;
  declare orders: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private userService: UserService,
    private ordersService: OrdersService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.GetUserConnected();
    this.getOrders();


  }
  public getOrders() {
    this.refreshing = true;
    this.subscription.push(
      this.ordersService.getAllOrders().subscribe(
        (data: any) => {
          this.ordersService.addOrdersToLocalCache(data);
          this.orders = data;
          this.refreshing = false;
          console.log(data)
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Commande(s) chargée(s) avec succès`)
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

  onDeleteOrder(id: number) {

    this.subscription.push(
      this.userService.deleteUser(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `L'utilisateur a bien été supprimé avec succes`);
          this.getOrders();
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public searchOrders(searchTerm: string): void {
    const results: Orders[] = [];
    for (const order of this.ordersService.getOrdersFromLocalCache()) {
      if (
        order.refOrder.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||

        order.total.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(order);
      }
    }
    this.orders = results;
    if (results.length === 0 || !searchTerm) {
      this.orders = this.ordersService.getOrdersFromLocalCache()
    }
  }
}
