import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { decimal } from '../constants';
import { FanCalculator, Result } from './fan.calculator';

@Component({
  selector: 'app-fan-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './fan-calculator.component.html',
  styleUrl: './fan-calculator.component.css'
})
export class FanCalculatorComponent {
  in_stackSize: number = 1;
  in_fansAmount: number = 1;
  in_chance: number = 100;
  val_rpm: number = 256;
  val_distance: number = 0;
  out_time: number = 0;
  out_speed: number = 0;
  
  get fansHint(): string {
    return "Multiple fans applying the same processing effect on the same block divide the processing time";
  }

  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.updateValues(FanCalculator.calculate(this.val_rpm, this.in_stackSize, this.in_fansAmount, this.in_chance));
  }

  calculateFromDistance() {
    this.updateValues(FanCalculator.calculateFromDistance(this.val_distance, this.in_stackSize, this.in_fansAmount, this.in_chance));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_distance = result.distance;
    this.out_time = result.time;
    this.out_speed = result.speed;
  }
}
