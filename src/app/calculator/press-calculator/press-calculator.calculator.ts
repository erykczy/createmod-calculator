import { clamp, decimal, lerp } from "../constants";

export var cycle = 240;

export abstract class PressCalculator {
  public static calculateFromRpm(rpm: number): Result {
    if(rpm > 0) {
      let runningTickSpeed = Math.floor(lerp(1, 60, clamp(rpm/512, 0, 1)));
      let a = Math.ceil((cycle/2)/runningTickSpeed);
      let b = Math.ceil((cycle/2 + 1)/runningTickSpeed);
      let totalFrames: number = a + b + 2; // 2 frames are lost while checking for this.runningTicks>this.cycle and enabling 'running' state;
      
      return {
        rpm: rpm,
        time: decimal(totalFrames/20)!,
        speed: decimal(1/(totalFrames/20))!
      }
    }
    else {
      return {
        rpm: rpm,
        time: Number.POSITIVE_INFINITY,
        speed: 0
      }
    }
  }

  public static calculateFromTime(time: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time);
    let result = this.calculateFromRpm(resultRpm);
    return {
      rpm: decimal(resultRpm)!,
      time: decimal(result.time)!,
      speed: decimal(result.speed)!
    };
  }

  public static calculateFromSpeed(speed: number): Result {
    let result = this.calculateFromTime(1/speed);
    return {
      rpm: result.rpm,
      time: result.time,
      speed: result.speed
    };
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number): number {
    let time = this.calculateFromRpm(rpm).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}