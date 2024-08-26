import { Component, inject } from "@angular/core";
import { ActivationStart, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { BeltCalculatorComponent } from "./belt-calculator/belt-calculator.component";
import { FanCalculatorComponent } from "./fan-calculator/fan-calculator.component";
import { CalculatorService } from "./calculator.service";
import { CrushingCalculatorComponent } from "./crushing-calculator/crushing-calculator.component";
import { DrillCalculatorComponent } from "./drill-calculator/drill-calculator.component";
import { MillstoneCalculatorComponent } from "./millstone-calculator/millstone-calculator.component";
import { MixerCalculatorComponent } from "./mixer-calculator/mixer-calculator.component";
import { PressCalculatorComponent } from "./press-calculator/press-calculator.component";


@Component({
  selector: 'app-calculator-info',
  standalone: true,
  imports: [HeaderComponent, DrillCalculatorComponent, MixerCalculatorComponent, FanCalculatorComponent, PressCalculatorComponent, MillstoneCalculatorComponent, CrushingCalculatorComponent, BeltCalculatorComponent, RouterOutlet],
  templateUrl: './calculator-info.component.html',
  styleUrl: './calculator-info.component.css'
})
export class CalculatorInfoComponent {
  titleAnimation: boolean = false;
  iconAnimation: boolean = false;
  private calculatorService = inject(CalculatorService);
  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof ActivationStart) {
        this.calculatorService.setSelectedCalculator(val.snapshot.url[0].path);
        this.onCalculatorChanged();
      }
    })
  }

  get calculator() {
    return this.calculatorService.getSelectedCalculator();
  }

  onCalculatorChanged() {
    this.titleAnimation = true;
    this.iconAnimation = true;
  }
}