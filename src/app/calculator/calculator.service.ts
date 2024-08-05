import { Injectable } from "@angular/core";
import { Calculator } from "./calculator.model";
import { VariableType } from "./variable.model";
import { g_hardness } from "./constants";

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
          "name": "Raw Items/Second",
          "type": VariableType.NUMBER
        },
        {
          "name": "Items/Second (Cobblestone Generator)",
          "type": VariableType.NUMBER
        }
      ],
      calculate(input_values: number[]): number[] {
        const rpm = input_values[0];
        const hardness = Array.from(g_hardness.values())[input_values[1]];
        let time = 45*hardness/rpm;

        return [ (1/time), (1/(time+1)) ];
      }
    },
    {
      name: "Mechanical Mixer",
      iconPath: "assets/icons/mixer.png",
      inputs: [
        {
          "name": "RPM",
          "type": VariableType.NUMBER
        }
      ],
      ouputs: [
        {
          "name": "Items/Second",
          "type": VariableType.NUMBER
        }
      ],
      calculate(input_values: number[]): number[] {
        const rpm = input_values[0];

        return [ rpm ];
      }
    }
  ]
  private ins: number[] = [];
  private outs: number[] = [];
  isInputValid: boolean = false;
  
  get activeCalculator(): Calculator {
    return this.calculators[this.activeCalculatorIndex];
  }

  get availableCalculators(): Calculator[] {
    return this.calculators;
  }
  
  setActiveCalculator(index: number) {
    this.activeCalculatorIndex = index;
    this.calculate();
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