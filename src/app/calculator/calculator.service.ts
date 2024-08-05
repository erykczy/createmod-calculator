import { Injectable } from "@angular/core";

@Injectable({
  'providedIn': 'root'
})
export class CalculatorService {
  private m_activeCalculatorIndex = 0;

  get activeCalculatorIndex() {
    return this.m_activeCalculatorIndex;
  }

  setActiveCalculatorIndex(index: number) {
    this.m_activeCalculatorIndex = index;
  }
}