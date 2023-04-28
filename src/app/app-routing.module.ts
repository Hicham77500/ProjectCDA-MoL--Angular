import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';

import { LoginComponent } from './components/admin/login/login.component';

import { AuthenticationService } from './services/admin/authentication/authentication.service';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { HomeComponent } from './components/customer/home/home.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { AddPostComponent } from './components/admin/posts/add-post/add-post.component';
import { EditPostComponent } from './components/admin/posts/edit-post/edit-post.component';
import { ListPostComponent } from './components/admin/posts/list-post/list-post.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { NavbarComponent } from './components/customer/navbar/navbar.component';
import { ProfilComponent } from './components/customer/profil/profil.component';


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
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[authGuardAdminFn],
    children: [
      {
        path: 'listUser',
        component: ListUserComponent,
        canActivate:[authGuardAdminFn]

      }, {
        path: 'addUser',
        component: AddUserComponent,
        canActivate: [authGuardAdminFn]

      }, {
        path: 'editUser/:id',
        component: EditUserComponent,
        canActivate: [authGuardAdminFn]

      }, {
        path: 'listUser/:id',
        component: ListUserComponent,
        canActivate: [authGuardAdminFn]

      },
      {
        path: 'listPost',
        component: ListPostComponent,
        canActivate:[authGuardAdminFn]

      }, {
        path: 'addPost',
        component: AddPostComponent,
        canActivate: [authGuardAdminFn]

      }, {
        path: 'editPost/:id',
        component: EditPostComponent,
        canActivate: [authGuardAdminFn]

      }, {
        path: 'listPost/:id',
        component: ListPostComponent,
        canActivate: [authGuardAdminFn]

      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }