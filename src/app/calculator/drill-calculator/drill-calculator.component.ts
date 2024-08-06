import { Component } from '@angular/core';
import { g_hardness } from '../constants';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { NumberComponent } from "../shared/number/number.component";

@Component({
  selector: 'app-drill-calculator',
  standalone: true,
  imports: [InputSideComponent, OutputSideComponent, NumberComponent, EnumComponent],
  templateUrl: './drill-calculator.component.html',
  styleUrl: './drill-calculator.component.css'
})
export class DrillCalculatorComponent {
  in_rpm: number = 256;
  in_hardnessIndex: number = 0;
  in_customHardness: number = 0;
  out1: number = 0;
  out2: number = 0;
  out3: number = 0;

  get hardnessValues(): string[] {
    let arr: string[] = Array.from(g_hardness.keys());
    arr.unshift("<custom>");
    return arr;
  }

  get hardness(): number {
    if(this.in_hardnessIndex == 0)
      return this.in_customHardness;
    return Array.from(g_hardness.values())[this.in_hardnessIndex-1];
  }

  calculate() {
    this.out3 = 45*this.hardness/this.in_rpm;
    this.out1 = 1/this.out3;
    this.out2 = 1/(this.out3+1);
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
