import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { ArmCalculator, Result } from './arm.calculator';

@Component({
  selector: 'app-arm-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './arm-calculator.component.html',
  styleUrl: './arm-calculator.component.css'
})
export class ArmCalculatorComponent {
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  private cdRef = inject(ChangeDetectorRef);

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

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
  }
}
