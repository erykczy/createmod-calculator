import { Injectable } from "@angular/core";
import { g_calculatorsData } from "./constants";
import { CalculatorData } from "./calculator.model";

@Injectable({
  'providedIn': 'root'
})
export class CalculatorService {
  selectedCalculatorId: string = g_calculatorsData[0].id;

  getCalculator(id: string): CalculatorData | undefined {
    return g_calculatorsData.find((c) => c.id === id);
  }

  getSelectedCalculator(): CalculatorData {
    return this.getCalculator(this.selectedCalculatorId)!;
  }

  setSelectedCalculator(id: string) {
    this.selectedCalculatorId = id;
  }
}