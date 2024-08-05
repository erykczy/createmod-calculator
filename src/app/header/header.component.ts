import { Component, inject } from '@angular/core';
import { CalculatorService } from '../calculator/calculator.service';
import { g_calculatorsData } from '../calculator/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private calculatorService = inject(CalculatorService);

  get calculatorsData() {
    return g_calculatorsData;
  }

  get activeCalculatorIndex() {
    return this.calculatorService.activeCalculatorIndex;
  }

  onTabChanged(index: number) {
    this.calculatorService.setActiveCalculatorIndex(index);
  }
}
