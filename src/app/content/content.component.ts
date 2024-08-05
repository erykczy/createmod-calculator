import { Component, inject } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CalculatorService } from '../calculator/calculator.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  private calculatorService = inject(CalculatorService);

  get activeCalculatorIconPath() {
    return this.calculatorService.activeCalculator.iconPath;
  }
}
