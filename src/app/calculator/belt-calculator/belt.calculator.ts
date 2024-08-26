import { decimal } from "../constants";

export abstract class BeltCalculator {
  public static calculateFromRpm(rpm: number, stackSize: number, beltLength: number): Result {
    if(rpm > 0) {
      let ticksOneBlock = 1 / (rpm / 480);
      let secondsOneBlock = ticksOneBlock/20;
      return {
        rpm: rpm,
        stacksSpeed: decimal(1/secondsOneBlock)!,
        itemsSpeed: decimal(stackSize/secondsOneBlock)!,
        time: decimal(Math.ceil(ticksOneBlock * beltLength) / 20)!
      }
    }
    else {
      return {
        rpm: rpm,
        stacksSpeed: 0,
        itemsSpeed: 0,
        time: Number.POSITIVE_INFINITY
      }
    }
  }

  public static calculateFromTime(time: number, stackSize: number, beltLength: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, stackSize, beltLength);
    let result = this.calculateFromRpm(resultRpm, stackSize, beltLength);
    return result;
  }

  public static calculateFromItemsSpeed(speed: number, stackSize: number, beltLength: number): Result {
    let result = this.calculateFromStacksSpeed(speed/stackSize, stackSize, beltLength);
    return result;
  }

  public static calculateFromStacksSpeed(speed: number, stackSize: number, beltLength: number): Result {
    let result = this.calculateFromTime(1/speed*beltLength, stackSize, beltLength);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, stackSize: number, beltLength: number): number {
    let time = this.calculateFromRpm(rpm, stackSize, beltLength).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, stackSize, beltLength);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  itemsSpeed: number,
  stacksSpeed: number
}