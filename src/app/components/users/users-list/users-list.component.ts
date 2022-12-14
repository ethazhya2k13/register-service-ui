import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/Roles';
import { Users } from 'src/app/models/Users';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { AddUserComponent } from '../../add-user/add-user.component';
import { EditUserComponent } from '../../edit-user/edit-user.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isLoading = true;
  users: Users[] = []
  roles: Roles[] = []
  displayedColumns: string[] = [
    'userId',
    'firstName',
    'lastName',
    'userEmail',
    'userGender',
    'userName',
    'created',
    'updatedAt',
    'roleId',
    'roleName',
    'update',
    'delete',
  ]

  dataSource = new MatTableDataSource<Users>()
  apiResponse: any = [];
  //pagination
  @ViewChild('paginator')
  paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  isPopupOpened!: boolean;
  valid: any;

  constructor(  public dialog: MatDialog,
    private usersService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
}

  ngAfterViewInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getAllUsers();
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
         this.isLoading = false;
        this.apiResponse = response;
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(response)
      },
      error: (err) => {
        this.isLoading = false;
        alert('Error while fetching the Records')
      },
    })
  }

  addUsers() {
    this.isPopupOpened = true
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {},
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.getAllUsers()
      }
      this.isPopupOpened = false
    })
  }

  editUser(row: any) {
    this.dialog.open(EditUserComponent, {
      data: row,
    }).afterClosed().subscribe(value=> {
      if(value==='update'){
        this.getAllUsers();
      }
    })
  }

  deleteUser(userId: any) {
  Swal.fire({
    title:'Are you Sure?',
    text:'Do you really want to delete this?This process cannot be undone',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    showCloseButton: true
  }).then((result) => {
    if(result.isConfirmed){
      this.usersService.deleteUser(userId.userId).subscribe({
        next:(response) => {
        this.dataSource.data = this.dataSource.data.filter(
          (u: Users) => u.userId !== userId,
        )
        this.ngAfterViewInit()
      },
       error:()=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while deleting user!',

        })
      }
      } );
      Swal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      )
    }
  })
    }


  getAllRoles(){
    this.usersService.getAllRoles().subscribe({
      next:(response) => {
        this.roles = this.roles = response;
        console.log("roles"+response);
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while fetching the records!',

        })
      }
  })
   }

  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }

  onGenderChange($event: any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      return item.userGender.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }


  onRoleChange($event: any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      return item.roleName.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

  viewUsers(row:Users){
      let route = '/user/user-details';
      this.router.navigate([route],{queryParams: {userId: row.userId}})
  }

  resetFilters(){
    this.getAllUsers();
  }

  }
