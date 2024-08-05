import { Injectable } from "@angular/core";
import { Calculator } from "./calculator.model";
import { VariableType } from "./variable.model";

@Injectable({
  'providedIn': 'root'
})
export class CalculatorService {
  private activeCalculatorIndex = 0;
  private calculators: Calculator[] = [
    {
      name: "Mechanical Drill",
      iconPath: "assets/icons/drill.png",
      inputs: [
        {
          "name": "RPM",
          "type": VariableType.NUMBER
        },
        {
          "name": "Hardness",
          "type": VariableType.HARDNESS_ENUM
        }
      ],
      ouputs: [
        {
          "name": "Items/Second",
          "type": VariableType.NUMBER
        }
      ],
      calculate(input_values: number[]): number[] {
        return [ input_values[0]+5 ];
      }
    }
  ]
  private ins: number[] = [];
  private outs: number[] = [];
  isInputValid: boolean = false;
  
  get activeCalculator(): Calculator {
    return this.calculators[this.activeCalculatorIndex];
  }
  
  setInput(index: number, value: number) {
    this.ins[index] = value;
    this.validateInput();
    this.calculate();
  }

  getOutput(index: number): number {
    return this.outs[index];
  }

  private calculate() {
    if(this.isInputValid)
      this.outs = this.activeCalculator.calculate(this.ins);
  }

  private validateInput() {
    let valid = true;
    this.ins.forEach(element => {
      if(element === null) {
        valid = false;
        return;
      }
    });
    this.isInputValid = valid;
  }
}