import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/Users';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  users: Users[] = [];
  addUserForm!:FormGroup;
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog:MatDialogRef<AddUserComponent>,
    private usersService: UserService) {}

  ngOnInit(): void {
this.validation();

    }
    validation(){
      this.addUserForm = new FormGroup({
        firstName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
        lastName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
        userName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]),
        userPassword: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$%&*-]).{8,}$")]),
        userEmail: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        userGender: new FormControl('', [Validators.required]),
        });
    }
      // error handling
  public errorHandling = (control: string, error: string) => {
    return this.addUserForm.controls[control].hasError(error);
  }

    addUsers(){
      if(this.addUserForm.valid){
        this.usersService.addUser(this.addUserForm.value)
        .subscribe({
          next:(response)=>{
            (Swal.fire(
             {
              position: 'center',
              icon: 'success',
              title: 'User added successfully',
              showConfirmButton: false,
              timer: 1500
             }
            )
            ),

            this.addUserForm.reset();
            this.dialog.close('save');
          },
          error:()=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error while adding user!',

            })
          }
        })
      }
    }

    reset(){
      this.addUserForm.reset();
    }
}
