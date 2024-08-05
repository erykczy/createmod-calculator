import { Component, inject } from '@angular/core';
import { CalculatorSideComponent } from '../calculator/calculator-side.component';
import { CalculatorService } from '../calculator/calculator.service';
import { g_calculatorsData } from '../calculator/constants';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CalculatorSideComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  private calculatorService = inject(CalculatorService);

  get activeCalculatorIconPath() {
    return g_calculatorsData[this.calculatorService.activeCalculatorIndex].iconPath;
  }
}
