import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private requests: any = {};
constructor() { }

get(url: string):HttpResponse<any> | undefined {
  return this.requests[url];
}
//we will store this url and the particular response in this variable.which is array of obj (key value pair), it returns the repsonse of the url.

put(url: string, response: HttpResponse<any>): void{
  this.requests[url] = response;
}
//to save this particular url

invalidateUrl(url: string): void{
  this.requests[url] = undefined;
}

invalidateCache():void{
  this.requests = {};
}
}

//in order to avoid the repetitve cache calls for eg: to avoid the repetitive calls of getAllUsers() component we are using this. it will store al the details in the cache and we are also providing a time based clear cache system.
//retrieve and save the outgoing calls.
//four methods = 1 for get and put, another for invalidate the particular url and one is to invalidate the entire cache.
