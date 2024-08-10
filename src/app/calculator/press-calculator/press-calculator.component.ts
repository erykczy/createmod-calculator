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

  get hint1(): string {
    return "Includes time it takes to lift the press";
  }

  calculate() {
    if(this.in_rpm > 0) {
      let a = Math.ceil((this.cycle/2)/this.runningTickSpeed);
      let b = Math.ceil((this.cycle/2 + 1)/this.runningTickSpeed);
      let totalFrames: number = a + b + 2; // 2 frames are lost while checking for this.runningTicks>this.cycle and enabling 'running' state;

      this.out2 = totalFrames / 20;
      this.out1 = 1 / this.out2;
    }
    else {
      this.out1 = 0;
      this.out2 = 0;
    }

  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
