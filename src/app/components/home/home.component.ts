import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalCount!: number
  rolesCount!: number
  adminCount!: number
  usersCount!: number
  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.getTotalCount();
    this.getRolesCount();
    this.getAdminCount();
    this.getUserCount();
  }

  getTotalCount() {
    this.usersService.getTotalCount().subscribe(total => {
      this.totalCount = total;
    })
  }

  getRolesCount() {
    this.usersService.getRolesCount().subscribe(roles => {
      this.rolesCount = roles;
    })
  }

  getAdminCount() {
    this.usersService.getAdminCount().subscribe(admin => {
      this.adminCount = admin;
    })
  }

  getUserCount(){
    this.usersService.getUsersCount().subscribe(users => {
      this.usersCount = users;
    })
  }

}
