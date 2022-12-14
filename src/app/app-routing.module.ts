import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './components/_auth/auth.guard';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersListComponent, canActivate:[AuthGuard], data: {roles:['Admin']}}, //this canActivate needs to return true then only it will activate this route.
  { path: 'users-details/:userId', component: UserDetailsComponent, canActivate:[AuthGuard], data: {roles:['Admin']}}, //this canActivate needs to return true then only it will activate this route.
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'profile', component: UsersProfileComponent },
  { path: 'user', loadChildren:()=> import ('./components/users/users.module').then(m => m.UsersModule)},
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
