import { BeltCalculator } from "../belt-calculator/belt.calculator";
import { clamp, decimal } from "../constants";

export abstract class DeployerCalculator {
  public static calculateFromRpm(rpm: number, options: Options): Result {
    if(rpm > 0) {
      let timerSpeed = Math.floor(clamp(rpm * 2, 8, 512));

      let framesWaiting = Math.ceil(500 / timerSpeed) + 1;
      let framesExpanding = Math.ceil(1000 / timerSpeed) + 1;
      let framesRetracting = Math.ceil(1000 / timerSpeed) + 1;
      let framesOutputting = 10 + 1;

      let totalFrames = undefined;
      if(options.process === Process.PROCESSING) {
        let inputDelay = options.inputDelay;
        if(options.inputDelay === -1)
          inputDelay = Math.ceil(BeltCalculator.calculateFromRpm(options.beltRpm, 1, 1).time*20);

        totalFrames = framesExpanding + framesRetracting + Math.max(0, inputDelay - framesRetracting);
      }
      else if(options.process === Process.OTHER) {
        if(options.onContraption) {
          totalFrames = framesExpanding + framesRetracting;
        }
        else {
          totalFrames = framesWaiting + framesExpanding + framesRetracting;
          if(options.gathersItems)
            totalFrames += framesOutputting;
        }
      }
      else {
        if(options.onContraption)
          totalFrames = framesExpanding + framesRetracting;
        else {
          totalFrames = framesWaiting + framesExpanding + framesRetracting
        }

        let hits = Math.ceil(options.health / options.damage);
        totalFrames = hits * totalFrames;
        if(!options.onContraption && options.gathersItems)
          totalFrames += framesOutputting; 
      }

      return {
        rpm: rpm,
        time: decimal(totalFrames/20)!,
        speed: decimal(1/(totalFrames/20))!
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

  public static calculateFromTime(time: number, options: Options): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, options);
    let result = this.calculateFromRpm(resultRpm, options);
    return result;
  }

  public static calculateFromSpeed(speed: number, options: Options): Result {
    let result = this.calculateFromTime(1/speed, options);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, options: Options): number {
    let time = this.calculateFromRpm(rpm, options).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, options);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}

export enum Process {
  PROCESSING,
  KILLING,
  OTHER
}

export interface Options {
  process: Process,
  onContraption: number,
  gathersItems: number,
  health: number,
  damage: number,
  inputDelay: number,
  beltRpm: number
}