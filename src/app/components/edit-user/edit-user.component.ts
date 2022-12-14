import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  users: Users[] = [];
  editUserForm!: FormGroup;
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<EditUserComponent>,
    private router: Router,
    private usersService: UserService) { }

  ngOnInit(): void {
    this.validation();
    this.setData();
  }
  setData() {
    console.log(this.editData);
    console.log(this.editData.userId);
    if (this.editData) {
      this.editUserForm.controls['userId'].setValue(this.editData.userId);
      this.editUserForm.controls['firstName'].setValue(this.editData.firstName);
      this.editUserForm.controls['lastName'].setValue(this.editData.lastName);
      this.editUserForm.controls['userName'].setValue(this.editData.userName);
      this.editUserForm.controls['userPassword'].setValue(this.editData.userPassword);
      this.editUserForm.controls['userEmail'].setValue(this.editData.userEmail);
      this.editUserForm.controls['userGender'].setValue(this.editData.userGender);
      this.editUserForm.controls['created'].setValue(this.editData.created);
      this.editUserForm.controls['updatedAt'].setValue(this.editData.updatedAt);
      this.editUserForm.controls['roleId'].setValue(this.editData.roleId);
      this.editUserForm.controls['roleName'].setValue(this.editData.roleName);
    }
  }

  validation() {
    this.editUserForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userGender: new FormControl('', [Validators.required]),
      created: new FormControl('', [Validators.required]),
      updatedAt: new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required]),
      roleName: new FormControl('', [Validators.required]),
    });
  }
  // error handling
  public errorHandling = (control: string, error: string) => {
    return this.editUserForm.controls[control].hasError(error);
  }

  editUser() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.updateUser(this.editData.userId, this.editUserForm.value)
          .subscribe({
            next: (res) => {
              Swal.fire('User updated successfully!', '', 'success')
              console.log(res);
              this.editUserForm.reset();
              this.dialog.close('update');
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error while updating user!',
              })
            }
          })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
