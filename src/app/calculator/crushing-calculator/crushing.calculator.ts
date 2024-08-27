import { clamp, decimal } from "../constants";

export abstract class CrushingCalculator {
  public static calculateFromRpm(rpm: number, recipeDuration: number, stackSize: number, delay: number): Result {
    if(rpm > 0) {
      let speed = rpm/50*4;
  
      let step = clamp(speed/Math.log2(stackSize), 0.25, 20);
      let processTicks = Math.ceil(Math.max(0, recipeDuration - 19.999999)/step);
      let frames = processTicks+1+delay;
      
      return {
        rpm: rpm,
        time: decimal(frames/20)!,
        speed: decimal(stackSize / (frames/20))!
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

  public static calculateFromTime(time: number, recipeDuration: number, stackSize: number, delay: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, recipeDuration, stackSize, delay);
    let result = this.calculateFromRpm(resultRpm, recipeDuration, stackSize, delay);
    return result;
  }

  public static calculateFromSpeed(speed: number, recipeDuration: number, stackSize: number, delay: number): Result {
    let result = this.calculateFromTime(stackSize/speed, recipeDuration, stackSize, delay);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, recipeDuration: number, stackSize: number, delay: number): number {
    let time = this.calculateFromRpm(rpm, recipeDuration, stackSize, delay).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, recipeDuration, stackSize, delay);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}