import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { CrafterCalculator, Result } from './crafter.calculator';
import { NuenumComponent } from "../shared/nuenum/nuenum.component";
import { g_crafterInputDelays } from '../constants';
import { WarningComponent } from "../shared/warning/warning.component";
import { InfoComponent } from "../shared/info/info.component";

@Component({
  selector: 'app-crafter-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent, NuenumComponent, WarningComponent, InfoComponent],
  templateUrl: './crafter-calculator.component.html',
  styleUrl: './crafter-calculator.component.css'
})
export class CrafterCalculatorComponent {
  stressRatio: number = 2;
  val_stress: number = 0;
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  in_chainLength: number = 1;
  in_inputDelay: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  get delayKeys(): string[] { return Array.from(g_crafterInputDelays.keys()); }
  get delayValues(): number[] { return Array.from(g_crafterInputDelays.values()); }

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(CrafterCalculator.calculateFromRpm(this.val_rpm, this.in_chainLength, this.in_inputDelay));
  }

  calculateFromSpeed() {
    this.updateValues(CrafterCalculator.calculateFromSpeed(this.val_speed, this.in_chainLength, this.in_inputDelay));
  }

  calculateFromTime() {
    this.updateValues(CrafterCalculator.calculateFromTime(this.val_time, this.in_chainLength, this.in_inputDelay));
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
    this.val_stress = this.stressRatio * result.rpm;
  }
}
