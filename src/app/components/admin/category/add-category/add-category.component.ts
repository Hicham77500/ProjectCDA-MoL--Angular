import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Category } from 'src/app/models/category';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private router: Router,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
   
  }
  public onAddCategory(category: Category) {

    this.categoryService.addCategory(category).subscribe(
      (data: any) => {this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été créé avec succès")
     this.router.navigateByUrl('/admin/listcategory');}
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['message'])
    )


  }
}
