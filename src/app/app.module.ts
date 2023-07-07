import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { RegisterComponent } from './components/admin/register/register.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { HomeComponent } from './components/customer/home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NotificationModule } from './services/notification/notification.module';


import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { AboutComponent } from './components/customer/about/about.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { OrdersComponent } from './components/customer/orders/orders.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { ViewProductComponent } from './components/customer/view-product/view-product.component';
import { ListOrdersComponent } from './components/admin/orders/list-orders/list-orders.component';
import { ShowOrderlineComponent } from './components/admin/orders/show-orderline/show-orderline.component';
import { ShowDetailOrdersComponent } from './components/customer/orders/show-detail-orders/show-detail-orders.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { ListCategoryComponent } from './components/admin/category/list-category/list-category.component';
import { EditCategoryComponent } from './components/admin/category/edit-category/edit-category.component';
import { AddProductComponent } from './components/admin/product/add-product/add-product.component';
import { EditProductComponent } from './components/admin/product/edit-product/edit-product.component';
import { ListProductComponent } from './components/admin/product/list-product/list-product.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DashboardComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    CartComponent,
    OrdersComponent,
    ProfileComponent,
    ViewProductComponent,
    ListOrdersComponent,

    ShowOrderlineComponent,
     ShowDetailOrdersComponent,
     FooterComponent,
     AddCategoryComponent,
     ListCategoryComponent,
     EditCategoryComponent,
     AddProductComponent,
     EditProductComponent,
     ListProductComponent,



  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotificationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }