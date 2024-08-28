import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { ArmCalculator, Result } from './arm.calculator';
import { WarningComponent } from "../shared/warning/warning.component";
import { InfoComponent } from '../shared/info/info.component';

@Component({
  selector: 'app-arm-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent, WarningComponent, InfoComponent],
  templateUrl: './arm-calculator.component.html',
  styleUrl: './arm-calculator.component.css'
})
export class ArmCalculatorComponent {
  stressRatio: number = 2;
  val_stress: number = 0;
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  val_shortTime: number = 0;
  val_longTime: number = 0;
  val_count: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  get hint1() {
    return "Here \"cycle\" is the time it takes for Mechanical Arm to get from Input to Output and back to Input";
  }
  get hint2() {
    return "\"Short cycle\" is a cycle that has been shortened by lazyTick";
  }
  get hint3() {
    return "\"Normal cycle\" is a cycle that has not been shortened by lazyTick";
  }

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(ArmCalculator.calculateFromRpm(this.val_rpm));
  }

  calculateFromSpeed() {
    this.updateValues(ArmCalculator.calculateFromSpeed(this.val_speed));
  }

  calculateFromTime() {
    this.updateValues(ArmCalculator.calculateFromTime(this.val_time));
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
    this.val_shortTime = result.shortTime;
    this.val_longTime = result.longTime;
    this.val_count = result.count;
    this.val_stress = this.stressRatio * result.rpm;
  }
}
