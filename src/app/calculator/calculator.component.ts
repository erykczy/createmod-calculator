import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NumberVariableComponent } from "./shared/number-variable/number-variable.component";
import { Calculator } from './calculator.model';
import { CalculatorService } from './calculator.service';
import { VariableType } from './variable.model';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [HeaderComponent, NumberVariableComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  VariableType = VariableType;
  private calculatorService = inject(CalculatorService);
  ins: number[] = [];

  get activeCalculator(): Calculator {
    return this.calculatorService.activeCalculator;
  }
}
