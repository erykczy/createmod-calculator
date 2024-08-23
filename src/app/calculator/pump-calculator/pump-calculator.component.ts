import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { PumpCalculator, Result } from './pump.calculator';

@Component({
  selector: 'app-pump-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './pump-calculator.component.html',
  styleUrl: './pump-calculator.component.css'
})
export class PumpCalculatorComponent {
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  in_amount: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(PumpCalculator.calculateFromRpm(this.val_rpm, this.in_amount));
  }

  calculateFromSpeed() {
    this.updateValues(PumpCalculator.calculateFromSpeed(this.val_speed, this.in_amount));
  }

  calculateFromTime() {
    this.updateValues(PumpCalculator.calculateFromTime(this.val_time, this.in_amount));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
  }
}
