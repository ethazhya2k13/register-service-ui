import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private isTimerStarted = false; //tracks down the timing difference of started time and current time.
  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;

  constructor() {}

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
  }

  startTimer() { //helper methods used  to invoke the particular timing and to monitor the timing.
    if (!this.isTimerStarted) {

      this.dDay.setMinutes(
        this.dDay.getMinutes() + +environment.cacheTimeInMinutes //it will initiate the timer based on how many minutes we need this cache to be implemented.
      );
      this.getTimeDifference();
      this.isTimerStarted = true;
    }
  }

  resetTimer() {
    this.isTimerStarted = false;
    this.getTimeDifference();
  }

  getRemainingTime(): number {
    this.getTimeDifference();
    return this.timeDifference;
  }
}
//it tracks the moment we started saving something in the cache and then it will look for a set of time and if it is elapsed it is going to reset the time and it is going to invalidate the entire cache
