import { clamp, decimal } from "../constants";

export abstract class MixerCalculator {
  public static calculateFromRpm(rpm: number): Result {
    let time = (clamp(Math.floor(Math.log2(Math.floor(512 / rpm))) * Math.ceil(1 * 15) + 1, 1, 512)+1) / 20;
    return {
      rpm: rpm,
      time: time,
      speed: 1/time
    };
  }
}

export interface Result {
  rpm: number,
  time: number,
  speed: number
}