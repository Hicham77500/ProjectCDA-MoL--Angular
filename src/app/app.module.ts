import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

import { NotificationModule } from './services/notification/notification.module';

import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';

import { EditPostComponent } from './components/admin/posts/edit-post/edit-post.component';
import { ListPostComponent } from './components/admin/posts/list-post/list-post.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { AddPostComponent } from './components/admin/posts/add-post/add-post.component';
import { RegisterComponent } from './components/register/register.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    AddPostComponent,
    EditPostComponent,
    ListPostComponent,

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