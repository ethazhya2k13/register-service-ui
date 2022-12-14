import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  private apiURL!: string;
constructor(private http: HttpClient) { }

getAllUsers(): Observable<Users[]>{
  const getAllUsersurl = `${this.apiURL}/${environment.apiEndpoints.usersrole}`;
  return this.http.get<Users[]>(getAllUsersurl);
 }

//  validateUserNameNotTaken(control: AbstractControl){
//   return this.checkUserNameNotTaken(control.value).pipe(
//     map(res => {
//       return res ? null : {usernameTaken: true};
//     })
//   );
//  }

//  checkUserNameNotTaken(userName: string): Observable<boolean>{
//   // const getAllUsersurl = `${this.apiURL}/${environment.apiEndpoints.usersrole}`;
//   // return this.http.get(getAllUsersurl).pipe(
//   //   map((userNameList) =>
//   //     userNameList.filter(user => user.userName === userName)
//   //   ),
//   //   map(users = !users.length)
//   // );
//  }
}
