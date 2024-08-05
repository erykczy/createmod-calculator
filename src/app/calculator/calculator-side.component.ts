import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { CalculatorService } from "./calculator.service";
import { DrillCalculatorComponent } from "./drill-calculator/drill-calculator.component";
import { MixerCalculatorComponent } from "./mixer-calculator/mixer-calculator.component";


@Component({
  selector: 'app-calculator-side',
  standalone: true,
  imports: [HeaderComponent, DrillCalculatorComponent, MixerCalculatorComponent],
  templateUrl: './calculator-side.component.html',
  styleUrl: './calculator-side.component.css'
})
export class CalculatorSideComponent {
  private calculatorService = inject(CalculatorService);

  get activeCalculatorIndex() {
    return this.calculatorService.activeCalculatorIndex;
  }

}
