import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Orders } from 'src/app/models/orders';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/admin/user/user.service';
import { OrdersService } from 'src/app/services/customer/orders/orders.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
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
  }

  public GetUserConnected() {

    this.id = localStorage.getItem('userLoggedIn') as any;
    this.subscription.push(

      this.userService.getUser(this.id).subscribe(
        (data: User) => {
          this.userLoggedIn = data;
          this.orders = data.listOrders
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
