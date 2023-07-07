import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Category } from 'src/app/models/category';
import { AuthenticationService } from 'src/app/services/admin/authentication/authentication.service';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  urlPict = AppSettings.APP_URL_IMG;
  public editCategory = new Category();
  
  private subscription: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategory(id).pipe().subscribe({
      next: (data: Category) => {
        this.editCategory = data;
      },
      complete: () => console.log('ok')

    }
    )
  }
  onEdit(category: Category) {

    this.categoryService.editCategory(this.editCategory.idCat, category).subscribe(
      (data: any) => {
        this.notificationService.notify(NotificationType.SUCCESS, "Votre compte a été mise à jour avec succés")
        this.router.navigateByUrl('/admin/listcategory');
      }
      ,

      (err: HttpErrorResponse) => this.notificationService.notify(NotificationType.ERROR, err.error['hydra:description'])
    )


  }
  
}
