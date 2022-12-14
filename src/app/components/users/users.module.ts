import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialModule } from 'src/app/module/Material.module';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
  @NgModule({
    declarations: [
      UsersListComponent,
      UserDetailsComponent,
    LoadingSpinnerComponent,

    ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
