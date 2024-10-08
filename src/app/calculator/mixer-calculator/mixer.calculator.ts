import { clamp, decimal } from "../constants";

export abstract class MixerCalculator {
  public static calculateFromRpm(rpm: number): Result {
    if(rpm > 0) {
      let time = (clamp(Math.floor(Math.log2(Math.floor(512 / rpm))) * Math.ceil(1 * 15) + 1, 1, 512)+1) / 20;
      return {
        rpm: rpm,
        time: decimal(time)!,
        speed: decimal(1/time)!
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

  public static calculateFromTime(time: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time);
    let result = this.calculateFromRpm(resultRpm);
    return result;
  }

  public static calculateFromSpeed(speed: number): Result {
    let result = this.calculateFromTime(1/speed);
    return result;
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