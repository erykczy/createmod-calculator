import { Component } from '@angular/core';
import { g_hardness, g_delays } from '../../../constants';
import { EnumComponent } from '../../../shared/enum/enum.component';
import { InputSideComponent } from '../../../shared/input-side/input-side.component';
import { NuenumComponent } from '../../../shared/nuenum/nuenum.component';
import { NumberComponent } from '../../../shared/number/number.component';
import { OutputSideComponent } from '../../../shared/output-side/output-side.component';
import { WarningComponent } from '../../../shared/warning/warning.component';
import { WarningType } from '../../../shared/warning/warning.model';

@Component({
  selector: 'app-drill-rpm-time-calculator',
  standalone: true,
  imports: [InputSideComponent, OutputSideComponent, NumberComponent, EnumComponent, WarningComponent, NuenumComponent],
  templateUrl: './drill-rpm-time-calculator.component.html',
  styleUrl: './drill-rpm-time-calculator.component.css'
})
export class DrillRpmTimeCalculatorComponent {
  WarningType = WarningType;
  in_speed: number = 0;
  in_hardness: number = 0;
  in_delay: number = 0;
  out1: number = 0;
  out2: number = 0;
  out_realSpeed: number = 0;

  get hardnessKeys(): string[] { return Array.from(g_hardness.keys()); }
  get hardnessValues(): number[] { return Array.from(g_hardness.values()); }
  get delayKeys(): string[] { return Array.from(g_delays.keys()); }
  get delayValues(): number[] { return Array.from(g_delays.values()); }

  get delayHint(): string {
    return "The delay should be taken into account, for example, when using a cobblestone generator. This is the time it takes to generate a new block.";
  }

  equation(rpm: number) {
    if(rpm === 0)
      return 0;
    let breakSpeed = rpm/100;
    let a = Math.ceil(10/Math.max(1, Math.floor(breakSpeed/this.in_hardness)));
    let b = Math.floor(this.in_hardness/breakSpeed)+1;
    let totalFrames = (a-1) * b + 1 + 1; //+1 is frame of delay
    return totalFrames;
  }

  search(minRpm: number, maxRpm: number, targetTicks: number, accuracy: number, maxIndex: number, index: number = 0): any {
    let middleRpm = (maxRpm - minRpm)/2 + minRpm;
    if(maxRpm - minRpm <= accuracy*2) {
      let resultRpm = Math.round(middleRpm);
      return {
        rpm: resultRpm,
        ticks: this.equation(resultRpm)
      };
    }
    let resultTicks = this.equation(middleRpm);
    if(targetTicks < resultTicks)
      return this.search(middleRpm, maxRpm, targetTicks, accuracy, maxIndex, index+1);
    else
      return this.search(minRpm, middleRpm, targetTicks, accuracy, maxIndex, index+1);
  }

  calculate() {
    let result = this.search(0, 1000, this.in_speed*20, 0.2, 1000);
    this.out1 = result.rpm;
    this.out_realSpeed = result.ticks/20;
  }

  ngOnInit() {
    this.calculate();
  }

  ngDoCheck() { this.calculate(); }
}
