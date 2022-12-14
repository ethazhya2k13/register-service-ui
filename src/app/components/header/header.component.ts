import { Component,  EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  userName: any;
  constructor(private router: Router,public dialog: MatDialog,private authService: AuthService, public userService: UserService) { }

  ngOnInit(){
    this.userName = this.authService.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {},
    })
  }

  isLoggedIn(){
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(){
    Swal.fire({
      title:'Are you Sure?',
      text: 'Do you really want to logout?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Logout',
    showCloseButton: true
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.removeItem('isLoggedIn');
        this.authService.logout();
       this.router.navigateByUrl('');
       Swal.fire(
        {
          position: 'center',
          icon: 'success',
          title: 'Logged out successfully',
          showConfirmButton: false,
          timer: 1500
         }
      )
      }
    })

  }
}
