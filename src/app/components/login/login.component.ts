import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Observable} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;  //! = by compiler telling it is not assigned, by using this ! we are telling the compiler that the value for this will be assigned later or will be assigned in the runtime.
  loginRequest!: LoginRequest;
  loginSuccessMessage!: string;
  isError!: boolean;
 constructor(private authService: AuthService,private activatedRoute: ActivatedRoute,
    private router: Router,   public dialog: MatDialog, private formBuilder:FormBuilder) {
    this.loginRequest = {
      userName: '',
      userPassword: ''
    };
  }


  ngOnInit() { //this lifecycle hooks gets triggered when the component gets initiated. for eg: all the loading stuffs are placed inside this.
  this.validation();
    this.activatedRoute.queryParams
  .subscribe(params => {
    if(params['registered']!==undefined && params['registered'] === 'true'){
    }
  });
}

validation() {
  this.loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
  });
}

 // error handling

 public errorHandling = (control: string, error: string) => {
  return this.loginForm.controls[control].hasError(error);
}

  loginSubmit(loginForm: any){

    this.authService.login(loginForm.value).subscribe(
      (data:any) => {
      this.authService.setRoles(data.users.roles);
      this.authService.setToken(data.jwtToken);
      this.authService.setUsers(data.users);
      this.authService.setUserName(data.userName);
      this.authService.setRoleName(data.roleName);
      localStorage.setItem('isLoggedIn','true');
      const roles = data.roles.roleName;
      console.log("login role",roles);
      if(roles === 'Admin'){
        this.router.navigate(['/users']);
      }
      else{
        this.router.navigate(['/home']);
      }
      console.log(data)
      this.dialog.closeAll();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successfull',
        showConfirmButton: false,
        timer: 1500
       })

      },
      error=> {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Incorrect User Credentials',
          showConfirmButton: false,
          timer: 1500
         })      }
      );
    }



  public isLoginFormDirty():boolean{
    return this.loginForm.dirty || this.loginForm.touched;
  }

  canDeactivate():Observable<boolean> | boolean{
    if(this.isLoginFormDirty()){
      return confirm("Are you sure you want to leave this page? You will lose your changes!");
    }
    return true;
  }

  register(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: {},
    })
  }

  public isLoggedIn(){
    return localStorage.getItem('isLoggedIn') === 'true';
  }


  public logout(){
    this.authService.logout();
  }

}

