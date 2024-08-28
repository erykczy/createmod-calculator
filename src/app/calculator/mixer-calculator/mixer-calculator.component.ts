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
  stressRatio: number = 4;
  val_rpm: number = 256;
  val_speed: number = 0;
  val_time: number = 0;
  val_stress: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(MixerCalculator.calculateFromRpm(this.val_rpm));
  }

  calculateFromSpeed() {
    this.updateValues(MixerCalculator.calculateFromSpeed(this.val_speed));
  }

  calculateFromTime() {
    this.updateValues(MixerCalculator.calculateFromTime(this.val_time));
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
