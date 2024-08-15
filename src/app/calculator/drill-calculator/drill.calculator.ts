import { clamp, decimal } from "../constants";

export abstract class DrillCalculator {
  public static calculateFromRpm(hardness: number, delay: number, rpm: number): Result {
    if(rpm > 0) {
      let breakSpeed = rpm / 100;
  
      let a = Math.ceil(10/clamp(Math.floor(breakSpeed/hardness), 1, 10));
      let b = Math.floor(hardness/breakSpeed)+1;
      let totalFrames = (a-1) * b + 1 + 1; //+1 is frame of delay
  
      let delayInFrames = delay*20;
      let time = ((totalFrames-Math.min(1, delayInFrames)) + delayInFrames) / 20;
      return {
        rpm: rpm,
        time: decimal(time)!,
        speed: decimal(1 / time)!
      };
    }
    else {
      return {
        rpm: rpm,
        time: 0,
        speed: 0
      };
    }
  }

  public static calculateFromTime(hardness: number, delay: number, time: number): Result {
    let result = this.search(hardness, delay, 0, 1000, time*20, 1000, 0, -1, Number.POSITIVE_INFINITY);
    return {
      rpm: decimal(result.rpm)!,
      time: decimal(result.time)!,
      speed: decimal(1/result.time)!
    };
  }

  public static calculateFromSpeed(hardness: number, delay: number, speed: number): Result {
    let result = this.calculateFromTime(hardness, delay, 1/speed);
    return {
      rpm: result.rpm,
      time: result.time,
      speed: result.speed
    };
  }

  private static search(hardness: number, delay: number, minRpm: number, maxRpm: number, targetTicks: number, maxIndex: number, index: number, solution: number, solutionDistance: number): {rpm:number, time:number} {
    let middleRpm = Math.floor((maxRpm - minRpm)/2 + minRpm);
    let resultTicks = this.calculateFromRpm(hardness, delay, middleRpm).time*20;
    let distance = Math.abs(resultTicks - targetTicks);
    if(distance <= solutionDistance) {
      solution = middleRpm;
      solutionDistance = distance;
    }
    if(maxRpm - minRpm <= 1) {
      return {
        rpm: solution,
        time: this.calculateFromRpm(hardness, delay, solution).time
      };
    }
    if(targetTicks < resultTicks)
      return this.search(hardness, delay, middleRpm+1, maxRpm, targetTicks, maxIndex, index+1, solution, solutionDistance);
    else
      return this.search(hardness, delay, minRpm, middleRpm-1, targetTicks, maxIndex, index+1, solution, solutionDistance);
  }

}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}