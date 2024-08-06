import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { CalculatorService } from "./calculator.service";
import { DrillCalculatorComponent } from "./drill-calculator/drill-calculator.component";
import { MixerCalculatorComponent } from "./mixer-calculator/mixer-calculator.component";
import { BulkProcessingCalculatorComponent } from "./bulk-processing-calculator/bulk-processing-calculator.component";
import { PressCalculatorComponent } from "./press-calculator/press-calculator.component";
import { MillstoneCalculatorComponent } from "./millstone-calculator/millstone-calculator.component";
import { CrushingCalculatorComponent } from "./crushing-calculator/crushing-calculator.component";
import { BeltCalculatorComponent } from "./belt-calculator/belt-calculator.component";


@Component({
  selector: 'app-calculator-side',
  standalone: true,
  imports: [HeaderComponent, DrillCalculatorComponent, MixerCalculatorComponent, BulkProcessingCalculatorComponent, PressCalculatorComponent, MillstoneCalculatorComponent, CrushingCalculatorComponent, BeltCalculatorComponent],
  templateUrl: './calculator-side.component.html',
  styleUrl: './calculator-side.component.css'
})
export class CalculatorSideComponent {
  private calculatorService = inject(CalculatorService);

  get activeCalculatorIndex() {
    return this.calculatorService.activeCalculatorIndex;
  }

}
