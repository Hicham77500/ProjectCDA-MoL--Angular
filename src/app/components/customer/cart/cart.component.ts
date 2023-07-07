import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { OrderLine } from 'src/app/models/orderLine';
import { Orders } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/admin/user/user.service';
import { CartService } from 'src/app/services/customer/cart/cart.service';
import { OrderlinesService } from 'src/app/services/customer/orderlines/orderlines.service';
import { OrdersService } from 'src/app/services/customer/orders/orders.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterContentChecked {
  declare id: number;
  declare userLoggedIn: User;
  public urlImage = AppSettings.APP_URL_IMG;
  public cartItems: any;
  declare totalItemInCart: any;
  declare totalAmount: any;
  declare isUserLogged: boolean;
  private subscription: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private orderLinesService: OrderlinesService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
  ) 
  {

  }
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartProducts();
    this.isUserLogged = this.isUserLoggedIn();
    this.GetUserConnected();
  }
  ngAfterContentChecked(): void {
    this.cartItems = this.cartService.getCartProducts();
    this.totalItemInCart = this.cartService.getCartTotalItems();
    this.totalAmount = this.getTotalAmount()

  }

  onPayment() {
    let order = new Orders();
    let idUser = JSON.parse(localStorage.getItem('userLoggedIn') as any)
    let refOrder = Math.floor(Math.random() * 10000000000) + 1 as any
    order.setIdUser(idUser)
    order.setUserLastName(this.userLoggedIn.lastName)
    order.setUserFirstName(this.userLoggedIn.firstName)
    order.setRefOrder(refOrder.toString())
    order.setTotal(this.totalAmount)
    console.log(order)

    this.ordersService.addOrder(order).subscribe(
      (response : any) =>{
        console.log(response);
        
        this.cartItems.forEach((cartItem: any) => {
          let orderLine = new OrderLine();
          orderLine.setIdOrder(response.idOrder)
          orderLine.setIdProd(cartItem.product.idProd)
          orderLine.setProdName(cartItem.product.name)
          orderLine.setProdPrice(cartItem.product.price)
          orderLine.setQuantity(cartItem.qty)
          orderLine.setAmount(cartItem.product.price * cartItem.qty)
          this.orderLinesService.addOrderLines(orderLine).subscribe(
            (response2 : any) =>{
              this.deleteCart()
              this.notificationService.notify(NotificationType.SUCCESS, "Votre commande a été effectué avec succès")
              this.router.navigateByUrl('/')

            })
        });
      }
    )
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
  public isUserLoggedIn() {
    if (localStorage.getItem('userLoggedIn')) {
      return true
    }
    return false
  }
  getTotalAmount() {

    return this.cartService.getTotalAmount();
  }

  remove(product: Product) {

    this.cartService.removeFromCart(product);
  }
  increase(product: Product) {
    this.cartService.increaseProduct(product);
  }
  decrease(product: Product) {

    this.cartService.decreaseProduct(product);

  }
  deleteCart(){
    this.cartService.deleteCart();
  }
}

