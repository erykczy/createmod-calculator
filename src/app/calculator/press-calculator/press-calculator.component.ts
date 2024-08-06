import { Component } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";

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

  calculate() {
    this.out2 = 12 / (1+59*Math.max(0, Math.min(1, this.in_rpm/512)));
    this.out1 = 1 / this.out2;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
