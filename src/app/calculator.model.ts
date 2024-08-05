import { EnumVariable, NumberVariable } from "./variable.model";

export interface Calculator {
  name: string;
  iconPath: string;
  inputs: NumberVariable[] | EnumVariable[];
  outputs: NumberVariable[];
}