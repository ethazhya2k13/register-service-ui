import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {
users:any;
  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.users = this.authService.getUsers();
  }
}
