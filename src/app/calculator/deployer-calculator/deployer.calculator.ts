import { clamp, decimal } from "../constants";

export abstract class DeployerCalculator {
  public static calculateFromRpm(rpm: number, process: Process, health: number, damage: number): Result {
    if(rpm > 0 && damage > 0) {
      let timerSpeed = Math.floor(clamp(rpm * 2, 8, 512));

      let framesWaiting = Math.ceil(500 / timerSpeed) + 1;
      let framesExpanding = Math.ceil(1000 / timerSpeed) + 1;
      let framesRetracting = Math.ceil(1000 / timerSpeed) + 1;

      let totalFrames = 0;
      switch(process) {
        case Process.BELT_PROCESSING:
          totalFrames = framesExpanding + framesRetracting;
          break;
        case Process.USING_ITEM:
          totalFrames = framesWaiting + framesExpanding + framesRetracting;
          break;
        case Process.KILLING:
          let hits = Math.ceil(health / damage);
          totalFrames = hits * (framesWaiting + framesExpanding + framesRetracting);
          totalFrames += 10 + 1; // output overflow items
          break;
      }

      return {
        rpm: rpm,
        time: totalFrames/20,
        speed: 1/(totalFrames/20)
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

  public static calculateFromTime(time: number, process: Process, health: number, damage: number): Result {
    let resultRpm = this.searchForRpm(0, 1024, time, process, health, damage);
    let result = this.calculateFromRpm(resultRpm, process, health, damage);
    return result;
  }

  public static calculateFromSpeed(speed: number, process: Process, health: number, damage: number): Result {
    let result = this.calculateFromTime(1/speed, process, health, damage);
    return result;
  }

  private static searchForRpm(rpm: number, maxRpm: number, targetTime: number, process: Process, health: number, damage: number): number {
    let time = this.calculateFromRpm(rpm, process, health, damage).time;
    if(time <= targetTime || rpm >= maxRpm) {
      return rpm;
    }
    else {
      return this.searchForRpm(rpm+1, maxRpm, targetTime, process, health, damage);
    }
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}

export enum Process {
  BELT_PROCESSING,
  KILLING,
  USING_ITEM
}