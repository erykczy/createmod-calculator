import { clamp, decimal } from "../constants";

export abstract class SawCalculator {
  public static calculateFromRpm(rpm: number, recipeDuration: number): Result {
    if(rpm > 0) {
      let processingTime = clamp(rpm / 24, 1, 128);
      let frames = 0;
      frames += Math.floor((recipeDuration-5)/processingTime + 1);
      frames += Math.ceil(20/processingTime);

      return {
        rpm: rpm,
        time: decimal(frames/20)!,
        speed: decimal(1/(frames/20))!
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