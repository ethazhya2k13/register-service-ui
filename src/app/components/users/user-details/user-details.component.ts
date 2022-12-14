import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roles } from 'src/app/models/Roles';
import { Users } from 'src/app/models/Users';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  users: Users = new Users();
  // roles: Roles[] = [];
  // users!: Users ;
  constructor(private userService: UserService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let userId: number = params['userId'];
      if(userId){
        this.userService.getUserById(userId)
        .subscribe(
          (response) =>
          // console.log("routed response",response)
           this.users = response
        );

      }

    }
    )
  }



}
