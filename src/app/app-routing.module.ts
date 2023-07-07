import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';

import { LoginComponent } from './components/admin/login/login.component';

import { AuthenticationService } from './services/admin/authentication/authentication.service';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { HomeComponent } from './components/customer/home/home.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';

import { RegisterComponent } from './components/admin/register/register.component';

// import { ProfilComponent } from './components/customer/profil/profil.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { ViewProductComponent } from './components/customer/view-product/view-product.component';
import { AboutComponent } from './components/customer/about/about.component';
import { OrdersComponent } from './components/customer/orders/orders.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { ListOrdersComponent } from './components/admin/orders/list-orders/list-orders.component';
import { ShowOrderlineComponent } from './components/admin/orders/show-orderline/show-orderline.component';
import { ShowDetailOrdersComponent } from './components/customer/orders/show-detail-orders/show-detail-orders.component';
import { AddProductComponent } from './components/admin/product/add-product/add-product.component';
import { EditProductComponent } from './components/admin/product/edit-product/edit-product.component';
import { ListProductComponent } from './components/admin/product/list-product/list-product.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/admin/category/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/admin/category/list-category/list-category.component';


const authGuardFn: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  return authService.isLoggedInAsUser();
}
const authGuardAdminFn: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  return authService.isLoggedInAsAdmin();

}
const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    
    children: [
      {
        path: '',
        component: HomeComponent,
       
      },
      {
        path: "product/:id",
        component: ViewProductComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
        // canActivate:[authGuardFn],
      },
      {
        path: "showDetailOrder/:id",
        component: ShowDetailOrdersComponent,
        // canActivate:[authGuardFn],
      },
      {
        path: "profile",
        component: ProfileComponent,
        // canActivate:[authGuardFn],
      },
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },
  

  {
    path: 'admin',
    component: DashboardComponent,
    // canActivate:[authGuardAdminFn],
    children: [
      {
        path: 'listUser',
        component: ListUserComponent,
        // canActivate:[authGuardAdminFn]

      }, {
        path: 'addUser',
        component: AddUserComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'editUser/:id',
        component: EditUserComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'listUser/:id',
        component: ListUserComponent,
        // canActivate: [authGuardAdminFn]

      },
      {
        path: 'listProduct',
        component: ListProductComponent,
        // canActivate:[authGuardAdminFn]

      }, {
        path: 'addProduct',
        component: AddProductComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'editProduct/:id',
        component: EditProductComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'listProduct/:id',
        component: ListProductComponent,
        // canActivate: [authGuardAdminFn]

      },
      {
        path: 'listCategory',
        component: ListCategoryComponent,
        // canActivate:[authGuardAdminFn]

      }, {
        path: 'addCategory',
        component: AddCategoryComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'editCategory/:id',
        component: EditCategoryComponent,
        // canActivate: [authGuardAdminFn]

      }, {
        path: 'listCategory/:id',
        component: ListCategoryComponent,
        // canActivate: [authGuardAdminFn]

      },
      {
        path: 'listOrders',
        component: ListOrdersComponent,
        // canActivate:[authGuardAdminFn]

      }, {
        path: 'showOrderLine/:id',
        component: ShowOrderlineComponent,
        // canActivate: [authGuardAdminFn]

      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }