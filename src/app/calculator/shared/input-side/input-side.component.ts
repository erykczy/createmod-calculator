import { Component, inject } from '@angular/core';
import { CalculatorService } from '../../calculator.service';
import { g_calculatorsData } from '../../constants';

@Component({
  selector: 'app-input-side',
  standalone: true,
  imports: [],
  templateUrl: './input-side.component.html',
  styleUrl: './input-side.component.css'
})
export class InputSideComponent {
  private calculatorService = inject(CalculatorService);

  get calculatorName() {
    return g_calculatorsData[this.calculatorService.activeCalculatorIndex].name;
  }
}
