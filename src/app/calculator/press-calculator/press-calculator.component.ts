import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { clamp, lerp } from '../constants';
import { PressCalculator, Result } from './press-calculator.calculator';

@Component({
  selector: 'app-press-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './press-calculator.component.html',
  styleUrl: './press-calculator.component.css'
})
export class PressCalculatorComponent {
  stressRatio: number = 8;
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  val_stress: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.calculateFromRpm();
  }

  get hint1(): string {
    return "Includes time it takes to lift the press";
  }

  calculateFromRpm() {
    this.updateValues(PressCalculator.calculateFromRpm(this.val_rpm));
  }

  calculateFromSpeed() {
    this.updateValues(PressCalculator.calculateFromSpeed(this.val_speed));
  }

  calculateFromTime() {
    this.updateValues(PressCalculator.calculateFromTime(this.val_time));
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
