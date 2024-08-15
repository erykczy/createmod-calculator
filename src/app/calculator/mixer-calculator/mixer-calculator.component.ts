import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { clamp } from '../constants';
import { WarningComponent } from "../shared/warning/warning.component";
import { MixerCalculator, Result } from './mixer.calculator';

@Component({
  selector: 'app-mixer-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent, WarningComponent],
  templateUrl: './mixer-calculator.component.html',
  styleUrl: './mixer-calculator.component.css'
})
export class MixerCalculatorComponent {
  val_rpm: number = 256;
  val_speed: number = 0;
  val_time: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  calculateFromRpm() {
    this.updateValues(MixerCalculator.calculateFromRpm(this.val_rpm!));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // detect changes because I will change variables in a moment
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
    this.cdRef.detectChanges();
  }
}
