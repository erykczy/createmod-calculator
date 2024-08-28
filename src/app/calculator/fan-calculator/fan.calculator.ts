import { decimal, lerp } from "../constants";

export abstract class FanCalculator {
  public static calculate(rpm: number, stackSize: number, fansAmount: number, chance: number): Result {
    if(rpm > 0) {
      let time: number;
      if(stackSize <= 16)
        time = 7.5;
      else if(stackSize <= 32)
        time = 15;
      else if(stackSize <= 48)
        time = 22.5;
      else
        time = 30;
      time /= fansAmount;
      let distance = lerp(3, 20, Math.min(1, rpm / 256));

      return {
        rpm: rpm,
        time: decimal(time)!,
        speed: decimal(stackSize/time * chance/100)!,
        distance: decimal(distance)!
      };
    }
    else {
      return {
        rpm: rpm,
        time: Number.POSITIVE_INFINITY,
        speed: 0,
        distance: 0
      }
    }
  }

  public static calculateFromDistance(distance: number, stackSize: number, fansAmount: number, chance: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, distance, stackSize, fansAmount, chance);
    let result = this.calculate(resultRpm, stackSize, fansAmount, chance);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetDistance: number, stackSize: number, fansAmount: number, chance: number): number {
    let distance = this.calculate(rpm, stackSize, fansAmount, chance).distance;
    if(distance >= targetDistance || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetDistance, stackSize, fansAmount, chance);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number,
  distance: number
}