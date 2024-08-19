import { clamp, decimal } from "../constants";

export abstract class ArmCalculator {
  public static calculateFromRpm(rpm: number): Result {
    if(rpm > 0) {
      let phase: number = Phase.MOVE_TO_OUTPUT;
      let chasedPointProgress = 0;
      let lazyTickCounter = 11;
      let frame = 0;
      let run_simulation = true;
      for(; run_simulation; frame++) {
        if(lazyTickCounter-- <= 0) {
          lazyTickCounter = 10;
          lazyTick();
        }

        // tick progress
        let targetReachedPreviously: boolean = chasedPointProgress >= 1;
        chasedPointProgress += Math.min(256, rpm) / 1024;
        if(chasedPointProgress > 1) chasedPointProgress = 1;
        let targetReached: boolean = !targetReachedPreviously && chasedPointProgress >= 1;

        if(chasedPointProgress < 1) continue;
        if(phase === Phase.MOVE_TO_INPUT) {
          phase = Phase.SEARCH_OUTPUTS;
          chasedPointProgress = 0;
        }
        else if(phase === Phase.MOVE_TO_OUTPUT) {
          phase = Phase.SEARCH_INPUTS;
          chasedPointProgress = 0;
        }
        else if(phase === Phase.SEARCH_INPUTS) {
          phase = Phase.MOVE_TO_INPUT;
          chasedPointProgress = 0;
        }

        if(targetReached)
          lazyTick()

        function lazyTick() {
          if(chasedPointProgress < 0.5)
            return;
          if(phase === Phase.SEARCH_OUTPUTS) {
            phase = Phase.MOVE_TO_OUTPUT;
            chasedPointProgress = 0;
            run_simulation = false;
          }
        }
      }
      console.log((frame-2+1));

      return {
        rpm: rpm,
        time: (frame+1),
        speed: 0
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