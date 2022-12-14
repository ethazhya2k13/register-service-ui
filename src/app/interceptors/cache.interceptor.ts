import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { HttpCacheService } from '../services/http-cache.service';
import { HttpResponse } from '@angular/common/http';
import { TimerService } from '../services/cache-time.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private httpCache:HttpCacheService,
    private timerService: TimerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.timerService.startTimer();
    let remainingTimeInMilliseconds = this.timerService.getRemainingTime();

    if (remainingTimeInMilliseconds <= 0) {
      this.timerService.resetTimer();
      console.log(
        `Invalidating cache due to cache time limit: ${request.method} ${request.url}`
      );
      this.httpCache.invalidateCache();
    }
    //check if the outgoing calls are GET apis
    if(request.method === 'GET'){
      //attempt to retrieve a cached response
      const cachedResponse: | HttpResponse<any> | undefined = this.httpCache.get(request.url);

      //return cached response
      if(cachedResponse){
        console.log(`Returning a cached response: ${cachedResponse.url}`);
        console.log(cachedResponse);
        return of(cachedResponse);
      }

      //send request to server and add response to cache
      return next.handle(request).pipe(
        tap((event:any) => {
            if(event instanceof HttpResponse){
              console.log(`Adding item to cache: ${request.url}`);
              this.httpCache.put(request.url, event);
            }
        })
      );
    }
    else{
      //pass along non-cacheable requests
      return next.handle(request);
    }
  }

}

//it will intercept the outgoing calls.  and angular will monitor the every single calls and it will manipulate the request or do some action based on the response.
//here we are going to call the http cache service and see whether we have any saved response already and if we dont have we are goin to the call the put method and save the response into the private variable which is under the http cache service,
