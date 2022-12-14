import { EventEmitter, Injectable, Output } from '@angular/core';
import { RegisterRequest } from 'src/app/models/register-request';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiURL!: string;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private http: HttpClient,
  ) {
    this.apiURL = environment.apiUrl;
  }


  login(loginDetails: LoginRequest) {
    const url = `${this.apiURL}/${environment.apiEndpoints.authenticate}`;
    return this.http
      .post<LoginResponse>(url, loginDetails, {
        headers: this.requestHeader,
       });
  }

  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  getJwtToken():string {
    return localStorage.getItem('jwtToken') || '{}';
  }
  logout() {
   localStorage.removeItem("jwtToken");
   localStorage.removeItem("roles");
   localStorage.removeItem("roleName");
   localStorage.removeItem("users");
   localStorage.removeItem("userName");
   localStorage.removeItem("isLoggedIn");

  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') || '{}');
  }
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getUsers():[] {
    return JSON.parse(localStorage.getItem('users')|| '{}');
  }
  public setUsers(users: []) {
    localStorage.setItem('users',JSON.stringify(users));
 }
 public setUserName(userName: string){
  localStorage.setItem('userName',userName);
}
  public getUserName():string {
  return localStorage.getItem('userName')|| '{}';
}
public setRoleName(roleName: string){
  localStorage.setItem('roleName',roleName);
}
  public getRoleName(): string {
  return localStorage.getItem('roleName')|| '{}';
}
  public roleMatch(allowedRoles: string | any[]): boolean | undefined {
    let isMatch = false;
    const userRoles: any = this.getRoles();
    if (userRoles != null && userRoles) {
       for (let i = 0; i < userRoles.length; i++) {
         for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
