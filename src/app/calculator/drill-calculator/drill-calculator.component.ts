import { Component } from '@angular/core';
import { clamp, g_delays, g_hardness } from '../constants';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { NumberComponent } from "../shared/number/number.component";
import { WarningComponent } from "../shared/warning/warning.component";

@Component({
  selector: 'app-drill-calculator',
  standalone: true,
  imports: [InputSideComponent, OutputSideComponent, NumberComponent, EnumComponent, WarningComponent],
  templateUrl: './drill-calculator.component.html',
  styleUrl: './drill-calculator.component.css'
})
export class DrillCalculatorComponent {
  in_rpm: number = 256;
  in_hardnessIndex: number = 0;
  in_customHardness: number = 0;
  in_delayIndex: number = 0;
  in_customDelay: number = 0;
  out1: number = 0;
  out2: number = 0;

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

  get delayValues(): string[] {
    let arr: string[] = Array.from(g_delays.keys());
    arr.unshift("<custom>");
    return arr;
  }

  get delay(): number {
    if(this.in_delayIndex == 0)
      return this.in_customDelay;
    return Array.from(g_delays.values())[this.in_delayIndex-1];
  }

  get delayHint(): string {
    return "The delay should be taken into account, for example, when using a cobblestone generator. This is the time it takes to generate a new block.";
  }

  calculate() {
    if(this.in_rpm > 0) {
      let breakSpeed = this.in_rpm / 100;
      let ticksUntilNextProgress = 0;
      let destroyProgress = 0;
      let frame: number;
      for(frame = 0; true; frame++) {
        if(ticksUntilNextProgress-- > 0)
          continue;
  
        destroyProgress += clamp(Math.floor(breakSpeed / this.hardness), 1, 10 - destroyProgress);
  
        if(destroyProgress >= 10) {
          break;
        }
  
        ticksUntilNextProgress = Math.floor(this.hardness / breakSpeed);
      }
      frame += 1; // this weird frame of delay
      let totalFrames = frame+1;
  
      let delayInFrames = this.delay*20;
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
