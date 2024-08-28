import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { Result, SawCalculator } from './saw.calculator';
import { HeaderComponent } from "../../header/header.component";
import { NuenumComponent } from "../shared/nuenum/nuenum.component";
import { g_cuttingRecipes, g_sawHardness } from '../constants';
import { EnumComponent } from "../shared/enum/enum.component";
import { DrillCalculator } from '../drill-calculator/drill.calculator';

@Component({
  selector: 'app-saw-calculator',
  standalone: true,
  imports: [OutputSideComponent, NumberComponent, InputSideComponent, HeaderComponent, NuenumComponent, EnumComponent],
  templateUrl: './saw-calculator.component.html',
  styleUrl: './saw-calculator.component.css'
})
export class SawCalculatorComponent {
  stressRatio: number = 4;
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  in_recipeDuration: number = 0;
  in_hardness: number = 0;
  in_processIndex: number = 0;
  val_stress: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  get recipesKeys(): string[] { return Array.from(g_cuttingRecipes.keys()); }
  get recipesValues(): number[] { return Array.from(g_cuttingRecipes.values()); }
  get hardnessKeys(): string[] { return Array.from(g_sawHardness.keys()); }
  get hardnessValues(): number[] { return Array.from(g_sawHardness.values()); }
  get processes(): string[] {
    return [
      "Sawing",
      "Chopping"
    ]
  }
  get isChopping() {
    return this.in_processIndex === 1;
  }

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    if(this.isChopping)
      this.updateValues(DrillCalculator.calculateFromRpm(this.in_hardness, 0, this.val_rpm));
    else
      this.updateValues(SawCalculator.calculateFromRpm(this.val_rpm, this.in_recipeDuration));
  }

  calculateFromSpeed() {
    if(this.isChopping)
      this.updateValues(DrillCalculator.calculateFromSpeed(this.in_hardness, 0, this.val_speed));
    else
      this.updateValues(SawCalculator.calculateFromSpeed(this.val_speed, this.in_recipeDuration));
  }

  calculateFromTime() {
    if(this.isChopping)
      this.updateValues(DrillCalculator.calculateFromTime(this.in_hardness, 0, this.val_time));
    else
      this.updateValues(SawCalculator.calculateFromTime(this.val_time, this.in_recipeDuration));
  }

  calculateFromStress() {
    this.val_rpm = this.val_stress / this.stressRatio;
    this.calculateFromRpm();
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
    this.val_stress = result.rpm * this.stressRatio;
  }
}
