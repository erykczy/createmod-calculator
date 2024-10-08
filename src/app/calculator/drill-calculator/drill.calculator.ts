import { clamp, decimal } from "../constants";

export abstract class DrillCalculator {
  public static calculateFromRpm(hardness: number, delay: number, rpm: number): Result {
    if(rpm > 0) {
      let breakSpeed = rpm / 100;
  
      let a = Math.ceil(10/clamp(Math.floor(breakSpeed/hardness), 1, 10));
      let b = Math.floor(hardness/breakSpeed)+1;
      let totalFrames = (a-1) * b + 1 + 1; //+1 is frame of delay
  
      let time = ((totalFrames-Math.min(1, delay)) + delay) / 20;
      return {
        rpm: rpm,
        time: decimal(time)!,
        speed: decimal(1 / time)!
      };
    }
    else {
      return {
        rpm: rpm,
        time: Number.POSITIVE_INFINITY,
        speed: 0
      };
    }
  }

  public static calculateFromTime(hardness: number, delay: number, time: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, hardness, delay);
    let result = this.calculateFromRpm(hardness, delay, resultRpm);
    return result;
  }

  public static calculateFromSpeed(hardness: number, delay: number, speed: number): Result {
    let result = this.calculateFromTime(hardness, delay, 1/speed);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, hardness: number, delay: number): number {
    let time = this.calculateFromRpm(hardness, delay, rpm).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, hardness, delay);
    }
  }

}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}