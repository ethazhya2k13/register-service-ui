import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { Users } from 'src/app/models/Users';
import { environment } from 'src/environments/environment';
import { Roles } from 'src/app/models/Roles';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiURL!: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiUrl;
   }

   getAllUsers(): Observable<Users[]>{
    const getAllUsersurl = `${this.apiURL}/${environment.apiEndpoints.usersrole}`;
    return this.http.get<Users[]>(getAllUsersurl);
   }

   updateUser(userId:number, update: Users): Observable<any>{
    const updateUsersUrl = `${this.apiURL}/${environment.apiEndpoints.updateUser}/${userId}`;
    return this.http.put(updateUsersUrl,update,{responseType: 'text'});
   }

   addUser(user: Users): Observable<any>{
    const addUserUrl = `${this.apiURL}/${environment.apiEndpoints.adduser}`;
    return this.http.post(addUserUrl,user,{responseType: 'text'});
   }

   deleteUser(userId: number):Observable<any>{
    const deleteUserUrl = `${this.apiURL}/${environment.apiEndpoints.deleteUser}/${userId}`;
    return this.http.delete(deleteUserUrl,{responseType: 'text'});
  }

  getAllRoles(): Observable<Roles[]>{
    const rolesUrl = `${this.apiURL}/${environment.apiEndpoints.getroles}`;
    return this.http.get<Roles[]>(rolesUrl);
  }

  getUserById(userId: number): Observable<Users>{
    const getUserByIdUrl = `${this.apiURL}/${environment.apiEndpoints.userById}/${userId}`;
    return this.http.get<Users>(getUserByIdUrl);
  }

  getRolesCount():Observable<any>{
    const rolesCountUrl =  `${this.apiURL}/${environment.apiEndpoints.rolescount}`;
    return this.http.get(rolesCountUrl);
  }

  getTotalCount():Observable<any>{
    const totalCountUrl =  `${this.apiURL}/${environment.apiEndpoints.totalcount}`;
    return this.http.get(totalCountUrl);
  }

  getUsersCount():Observable<any>{
    const usersCountUrl =  `${this.apiURL}/${environment.apiEndpoints.userscount}`;
    return this.http.get(usersCountUrl);
  }

  getAdminCount():Observable<any>{
    const adminCountUrl =   `${this.apiURL}/${environment.apiEndpoints.admincount}`;
    return this.http.get(adminCountUrl);
  }
}
