import { Component, inject } from "@angular/core";
import { ActivationStart, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { BeltCalculatorComponent } from "./belt-calculator/belt-calculator.component";
import { BulkProcessingCalculatorComponent } from "./bulk-processing-calculator/bulk-processing-calculator.component";
import { CalculatorService } from "./calculator.service";
import { CrushingCalculatorComponent } from "./crushing-calculator/crushing-calculator.component";
import { DrillCalculatorComponent } from "./drill-calculator/drill-calculator.component";
import { MillstoneCalculatorComponent } from "./millstone-calculator/millstone-calculator.component";
import { MixerCalculatorComponent } from "./mixer-calculator/mixer-calculator.component";
import { PressCalculatorComponent } from "./press-calculator/press-calculator.component";


@Component({
  selector: 'app-calculator-side',
  standalone: true,
  imports: [HeaderComponent, DrillCalculatorComponent, MixerCalculatorComponent, BulkProcessingCalculatorComponent, PressCalculatorComponent, MillstoneCalculatorComponent, CrushingCalculatorComponent, BeltCalculatorComponent, RouterOutlet],
  templateUrl: './calculator-side.component.html',
  styleUrl: './calculator-side.component.css'
})
export class CalculatorSideComponent {
  private calculatorService = inject(CalculatorService);
  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof ActivationStart) {
        this.calculatorService.setSelectedCalculator(val.snapshot.url[0].path);
      }
    })
  }

}
