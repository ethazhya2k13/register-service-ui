import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog} from '@angular/material/dialog'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,  private router:Router,public dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.endsWith('addUser')){
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          console.log(event);
          return event;
        }
        )
      )
    }


    if(request.url.endsWith('getRolesCount')){
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          console.log(event);
          return event;
        }
        )
      )
    }

    if(request.url.endsWith('getUsersCount')){
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          console.log(event);
          return event;
        }
        )
      )
    }

    if(request.url.endsWith('getCountByRole?userRoles=Admin')){
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          console.log(event);
          return event;
        }
        )
      )
    }

    if(request.url.endsWith('getCountByRole?userRoles=User')){
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          console.log(event);
          return event;
        }
        )
      )
    }

    if(request.headers.get('No-Auth') === 'True'){
    return next.handle(request.clone());
  }
  const token = this.authService.getJwtToken();
  request = this.addToken(request, token);

  return next.handle(request).pipe(
    catchError(
      (err:HttpErrorResponse)=>{
        console.log(err.status);
        if(err.status === 401){
             this.router.navigate(['/home']);
          }
          else if(err.status === 403){
            this.router.navigate(['/forbidden']);
          }
          return throwError("Something went wrong");
          }
    )
  );
  }

  private addToken(request:HttpRequest<any>, token:string){
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}

