import { clamp, decimal } from "../constants";

export abstract class PumpCalculator {
  public static calculateFromRpm(rpm: number, amount: number): Result {
    if(rpm > 0) {
      //Math.ceil(1/(1 / 32 + clamp(rpm / 128, 0, 1) * 31 / 32));
      let transferSpeed = Math.floor(Math.max(1, rpm / 2));
      let transferSpeedSec = transferSpeed * 20;
      return {
        rpm: rpm,
        time: amount/transferSpeedSec,
        speed: transferSpeedSec
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

  public static calculateFromTime(time: number, amount: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, amount);
    let result = this.calculateFromRpm(resultRpm, amount);
    return result;
  }

  public static calculateFromSpeed(speed: number, amount: number): Result {
    let result = this.calculateFromTime(1/speed, amount);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, amount: number): number {
    let time = this.calculateFromRpm(rpm, amount).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, amount);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}