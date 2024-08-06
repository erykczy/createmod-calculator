import { Component } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";

@Component({
  selector: 'app-belt-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent],
  templateUrl: './belt-calculator.component.html',
  styleUrl: './belt-calculator.component.css'
})
export class BeltCalculatorComponent {
  in_rpm: number = 256;
  in_stackSize: number = 1;
  in_beltLength: number = 1;
  out1: number = 0;
  out2: number = 0;
  out3: number = 0;

  calculate() {
    let stacksPerMinute = 75/32 * this.in_rpm;
    let stacksPerSecond = stacksPerMinute / 60;
    this.out2 = stacksPerSecond;
    this.out1 = stacksPerSecond * this.in_stackSize;
    this.out3 = 1/stacksPerSecond*this.in_beltLength;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
