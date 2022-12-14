import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterRequest } from '../../models/register-request';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup ;
  registerDetails!: RegisterRequest;
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, private usersService: UserService,private formBuilder:FormBuilder) {
   this.registerDetails = {
    firstName: '',
    lastName: '',
    userEmail: '',
    userGender: '',
    userName: '',
    userPassword: ''
   };
 }

 ngOnInit(){
 this.validation();
}
validation() {
  this.registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    userEmail:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    userGender:['', Validators.required],
    userName: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    userPassword: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$%&*-]).{8,}$")]]
  });
}

 // error handling
 public errorHandling = (control: string, error: string) => {
  return this.registerForm.controls[control].hasError(error);
}

registerSubmit(){
  if(this.registerForm.valid){
    this.usersService.addUser(this.registerForm.value)
    .subscribe({
      next:(response)=>{
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registered successfully',
        text: 'Login to continue',
        showConfirmButton: false,
        timer: 2000
       })
      this.dialog.closeAll();
      this.login();
      },
      error:()=>{
        alert("Error while adding User")
      }
    })
  }
}
  public isFormDirty():boolean{
    return this.registerForm.dirty || this.registerForm.touched;
  }

  canDeactivate():Observable<boolean> | boolean{
    if(this.isFormDirty()){
      return confirm("Are you sure you want to leave this page? You will lose your changes!");
    }
    return true;
  }

  login(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {},
    })
  }
}
