import { Component } from '@angular/core';
import { clamp, g_delays, g_hardness } from '../constants';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { NumberComponent } from "../shared/number/number.component";
import { WarningComponent } from "../shared/warning/warning.component";
import { NuenumComponent } from "../shared/nuenum/nuenum.component";

@Component({
  selector: 'app-drill-calculator',
  standalone: true,
  imports: [InputSideComponent, OutputSideComponent, NumberComponent, EnumComponent, WarningComponent, NuenumComponent],
  templateUrl: './drill-calculator.component.html',
  styleUrl: './drill-calculator.component.css'
})
export class DrillCalculatorComponent {
  in_rpm: number = 256;
  in_hardness: number = 0;
  in_delay: number = 0;
  out1: number = 0;
  out2: number = 0;

  // get hardnessValues(): string[] {
  //   let arr: string[] = Array.from(g_hardness.keys());
  //   arr.unshift("<custom>");
  //   return arr;
  // }

  // get hardness(): number {
  //   if(this.in_hardnessIndex == 0)
  //     return this.in_customHardness;
  //   return Array.from(g_hardness.values())[this.in_hardnessIndex-1];
  // }
  get hardnessKeys(): string[] { return Array.from(g_hardness.keys()); }
  get hardnessValues(): number[] { return Array.from(g_hardness.values()); }
  get delayKeys(): string[] { return Array.from(g_delays.keys()); }
  get delayValues(): number[] { return Array.from(g_delays.values()); }

  get delayHint(): string {
    return "The delay should be taken into account, for example, when using a cobblestone generator. This is the time it takes to generate a new block.";
  }

  calculate() {
    if(this.in_rpm > 0) {
      let breakSpeed = this.in_rpm / 100;

      let a = Math.ceil(10/Math.max(1, Math.floor(breakSpeed/this.in_hardness)));
      let b = Math.floor(this.in_hardness/breakSpeed)+1;
      let totalFrames = (a-1) * b + 1 + 1; //+1 is frame of delay
  
      let delayInFrames = this.in_delay*20;
      this.out2 = ((totalFrames-Math.min(1, delayInFrames)) + delayInFrames) / 20;
      this.out1 = 1 / this.out2;
    }
    else {
      this.out1 = 0;
      this.out2 = 0;
    }
    
  }

  ngOnInit() {
    this.calculate();
  }

  ngDoCheck() { this.calculate(); }
}
