import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AddPostComponent } from './components/admin/posts/add-post/add-post.component';
import { EditPostComponent } from './components/admin/posts/edit-post/edit-post.component';
import { ListPostComponent } from './components/admin/posts/list-post/list-post.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { HomeComponent } from './components/customer/home/home.component';
import { NavbarComponent } from './components/customer/navbar/navbar.component';
import { ProfilComponent } from './components/customer/profil/profil.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NotificationModule } from './services/notification/notification.module';
import { PublishComponent } from './components/customer/publish/publish.component';
import { ProfilVisitComponent } from './components/customer/profil-visit/profil-visit.component';
import { ChatComponent } from './components/customer/chat/chat.component';
import { FooterComponent } from './components/footer/footer.component';





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
    ProfilComponent,
    PublishComponent,
    ProfilVisitComponent,
    ChatComponent,
    FooterComponent,



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