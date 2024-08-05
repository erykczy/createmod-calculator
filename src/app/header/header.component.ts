import { Component, inject } from '@angular/core';
import { CalculatorService } from '../calculator/calculator.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private calculatorService = inject(CalculatorService);

  get calculators() {
    return this.calculatorService.availableCalculators;
  }

  get activeCalculator() {
    return this.calculatorService.activeCalculator;
  }

  onTabChanged(index: number) {
    this.calculatorService.setActiveCalculator(index);
  }
}
