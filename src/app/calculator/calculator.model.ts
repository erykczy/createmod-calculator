import { Variable } from "./variable.model";

export interface Calculator {
  name: string;
  iconPath: string;
  inputs: Variable[];
  ouputs: Variable[];
  calculate(input_values: number[]): number[];
}
