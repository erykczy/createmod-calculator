import { clamp, decimal } from "../constants";

export abstract class ArmCalculator {
  private static readonly maxExecutions = 20;

  public static calculateFromRpm(rpm: number): Result {
    if(rpm > 0) {
      const ticksPerPhase = Math.ceil(1 / (Math.min(256, rpm) / 1024));
      const ticksForHalfPhase = Math.ceil(ticksPerPhase/2);

      let executions = 0;
      let totalFrames = 0;
      while(executions < this.maxExecutions) {
        let frames = ticksPerPhase * 3;
        let searchOutputsEndTick = Math.ceil((totalFrames+frames+ticksForHalfPhase)/11)*11;
        let searchOutputsDurationByLazyTick = (searchOutputsEndTick + 1) - (frames+totalFrames);
        searchOutputsDurationByLazyTick -= 1; // lazyTick() is executed before tick(), which means that MOVE_TO_OUTPUT will start progressing in the same frame
        let executedByLazyTick = searchOutputsDurationByLazyTick <= ticksPerPhase;
        let searchOutputsDuration = Math.min(searchOutputsDurationByLazyTick, ticksPerPhase);
        frames += searchOutputsDuration;
        //console.log("ex: "+executions+" | frames: "+frames+" | searchOutputsFrames: "+searchOutputsDuration, "searchOutputsDurationByLazyTick: "+searchOutputsDurationByLazyTick);
        executions++;
        totalFrames += frames;
        if(executedByLazyTick && executions > 1)
          break;
      }
      let averageTimeSec = (totalFrames / executions) / 20;

      return {
        rpm: rpm,
        time: averageTimeSec,
        speed: 1/averageTimeSec
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

enum Phase {
    SEARCH_INPUTS,
    MOVE_TO_INPUT,
    SEARCH_OUTPUTS,
    MOVE_TO_OUTPUT
}