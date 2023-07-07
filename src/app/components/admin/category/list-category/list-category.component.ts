import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit{
  declare id: number;
  declare userLoggedIn: User;
  urlPict =  AppSettings.APP_URL_IMG;
  declare categories: any;
  declare public refreshing: boolean;
  private subscription: Subscription[] = [];
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.GetUserConnected();
    this.getCategories();
    
    
    
  }
  public getCategories() {
    this.refreshing = true;
    this.subscription.push(
      this.categoryService.getCategories().subscribe(
        (data: any) => {
          this.categoryService.addCategoriesToLocalCache(data);
          this.categories = data;
          this.refreshing = false;
          
          this.notificationService.notify(NotificationType.SUCCESS, `${data.length} Categorie(s) chargé(s) avec succès`)
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

  onDeleteCategory(id: number) {

    this.subscription.push(
      this.categoryService.deleteCategory(id).subscribe(
        (data: CustomHttpResponse) => {
          this.notificationService.notify(NotificationType.SUCCESS, `La catégorie a bien été supprimé avec succes`);
          this.getCategories();
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public searchCategories(searchTerm: string): void {
    const results: Category[] = [];
    for (const category of this.categoryService.getCategoriesFromLocalCache()) {
      if (
        category.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
        // ||
        // user.firstName.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // user.username.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // user.uid.toString().toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(category);
      }
    }
    this.categories = results;
    if (results.length === 0 || !searchTerm) {
      this.categories = this.categoryService.getCategoriesFromLocalCache()
    }
  }
}
