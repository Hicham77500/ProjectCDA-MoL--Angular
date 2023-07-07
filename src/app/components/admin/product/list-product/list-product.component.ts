import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/admin/user/user.service';
import { ProductService } from 'src/app/services/admin/product/product.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit{
  declare id: number;
  declare userLoggedIn: User;
  urlPict =  AppSettings.APP_URL_IMG;
  declare products: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.GetUserConnected();
    this.getProducts();
    
    
    
  }
  public getProducts() {
    this.refreshing = true;
    this.subscription.push(
      this.productService.getProducts().subscribe(
        (data: any) => {
          this.productService.addProductsToLocalCache(data);
          this.products = data;
          this.refreshing = false;
          
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Produit(s) chargé(s) avec succès`)
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

  onDeleteProduct(id: number) {

    this.subscription.push(
      this.productService.deleteProduct(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `Le produit a bien été supprimé avec succes`);
          this.getProducts();
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public searchProducts(searchTerm: string): void {
    const results: Product[] = [];
    for (const product of this.productService.getProductsFromLocalCache()) {
      if (
        product.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
        // ||
        // user.firstName.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // user.username.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // user.uid.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !searchTerm) {
      this.products = this.productService.getProductsFromLocalCache()
    }
  }
}
