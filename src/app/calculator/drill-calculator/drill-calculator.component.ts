import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { clamp, g_delays, g_hardness } from '../constants';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { NumberComponent } from "../shared/number/number.component";
import { WarningComponent } from "../shared/warning/warning.component";
import { NuenumComponent } from "../shared/nuenum/nuenum.component";
import { DrillCalculator } from './drill.calculator';

@Component({
  selector: 'app-drill-calculator',
  standalone: true,
  imports: [InputSideComponent, OutputSideComponent, NumberComponent, EnumComponent, WarningComponent, NuenumComponent],
  templateUrl: './drill-calculator.component.html',
  styleUrl: './drill-calculator.component.css'
})
export class DrillCalculatorComponent {
  val_rpm: number = 256;
  val_speed: number = 0;
  val_time: number = 0;
  in_hardness: number = 0;
  in_delay: number = 0;
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  get hardnessKeys(): string[] { return Array.from(g_hardness.keys()); }
  get hardnessValues(): number[] { return Array.from(g_hardness.values()); }
  get delayKeys(): string[] { return Array.from(g_delays.keys()); }
  get delayValues(): number[] { return Array.from(g_delays.values()); }

  get delayHint(): string {
    return "The delay should be taken into account, for example, when using a cobblestone generator. This is the time it takes to generate a new block.";
  }

  calculateFromRpm() {
    this.cdRef.detectChanges(); // detect changes because I will change variables in a moment
    let result = DrillCalculator.calculateFromRpm(this.in_hardness, this.in_delay, this.val_rpm);
    this.val_speed = result.speed;
    this.val_time = result.time;
  }

  calculateFromTime() {
    this.cdRef.detectChanges(); // detect changes because I will change variables in a moment
    let result = DrillCalculator.calculateFromTime(this.in_hardness, this.in_delay, this.val_time);
    this.val_time = result.time;
    this.val_rpm = result.rpm;
    this.val_speed = result.speed;
  }

  calculateFromSpeed() {
    this.cdRef.detectChanges(); // detect changes because I will change variables in a moment
    let result = DrillCalculator.calculateFromSpeed(this.in_hardness, this.in_delay, this.val_speed);
    this.val_time = result.time;
    this.val_rpm = result.rpm;
    this.val_speed = result.speed;
  }
}
