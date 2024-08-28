import { decimal } from "../constants";

export abstract class MillstoneCalculator {
  public static calculateFromRpm(rpm: number, recipeDuration: number): Result {
    if(rpm > 0) {
      let mpf = Math.max(1, Math.min(512, Math.floor(rpm / 16)));
      let gt = Math.ceil(recipeDuration / mpf) + 1;

      return {
        rpm: rpm,
        time: decimal(gt/20)!,
        speed: decimal(1/(gt/20))!
      };
    }
    else {
      return {
        rpm: rpm,
        time: Number.POSITIVE_INFINITY,
        speed: 0
      }
    }
  }

  public static calculateFromTime(time: number, recipeDuration: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, recipeDuration);
    let result = this.calculateFromRpm(resultRpm, recipeDuration);
    return result;
  }

  public static calculateFromSpeed(speed: number, recipeDuration: number): Result {
    let result = this.calculateFromTime(1/speed, recipeDuration);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, recipeDuration: number): number {
    let time = this.calculateFromRpm(rpm, recipeDuration).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, recipeDuration);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}