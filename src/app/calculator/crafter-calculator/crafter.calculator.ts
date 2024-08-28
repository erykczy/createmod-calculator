import { clamp, decimal } from "../constants";

export abstract class CrafterCalculator {
  private static countDown(ticks: number, speed: number): number {
    return Math.ceil((ticks+1) / speed);
  }

  public static calculateFromRpm(rpm: number, chainLength: number, inputDelay: number): Result {
    if(rpm > 0) {
      let countDownSpeed = clamp(rpm, 4, 250);
      let frames = 0;
      frames += this.countDown(500, countDownSpeed); // earliest crafter, assembling
      frames += (chainLength-1)*this.countDown(1000, countDownSpeed); // for all crafter without the last one, exporting
      frames += (chainLength-1)*this.countDown(Math.max(100, countDownSpeed+1), countDownSpeed); // for all crafter without the first one, assembling
      frames += this.countDown(2000, countDownSpeed); // the last crafter, crafting
      frames += inputDelay; // input delay

      return {
        rpm: rpm,
        time: decimal(frames/20)!,
        speed: decimal(1/(frames/20))!
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

  public static calculateFromTime(time: number, chainLength: number, inputDelay: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, chainLength, inputDelay);
    let result = this.calculateFromRpm(resultRpm, chainLength, inputDelay);
    return result;
  }

  public static calculateFromSpeed(speed: number, chainLength: number, inputDelay: number): Result {
    let result = this.calculateFromTime(1/speed, chainLength, inputDelay);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, chainLength: number, inputDelay: number): number {
    let time = this.calculateFromRpm(rpm, chainLength, inputDelay).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, chainLength, inputDelay);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}