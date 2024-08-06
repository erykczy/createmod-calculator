import { Component } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { clamp, lerp } from '../constants';

@Component({
  selector: 'app-press-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './press-calculator.component.html',
  styleUrl: './press-calculator.component.css'
})
export class PressCalculatorComponent {
  in_rpm: number = 256;
  out1: number = 0;
  out2: number = 0;

  get cycle(): number {
    return 240;
  }

  get runningTickSpeed(): number {
    return Math.floor(lerp(1, 60, clamp(this.in_rpm/512, 0, 1)));
  }

  calculate() {
    let runningTicks = 0;
    let frame: number;
    for(frame = 0; true; frame++) {
      if(runningTicks > this.cycle)
        break;

      let prevRunningTicks = runningTicks;
      runningTicks += this.runningTickSpeed;
      
      if(prevRunningTicks < this.cycle / 2 && runningTicks >= this.cycle / 2) {
        runningTicks = this.cycle / 2;
      }
    }
    frame += 1; // 1 lost frame while enabling 'running' state
    let totalFrames: number = frame+1;

    this.out2 = totalFrames / 20;
    this.out1 = 1 / this.out2;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
