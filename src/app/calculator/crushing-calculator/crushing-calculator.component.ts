import { Component } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { clamp, g_crushingRecipes, g_delays, g_inputDelays, g_millstoneRecipes } from '../constants';
import { NuenumComponent } from "../shared/nuenum/nuenum.component";

@Component({
  selector: 'app-crushing-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, EnumComponent, InputSideComponent, NuenumComponent],
  templateUrl: './crushing-calculator.component.html',
  styleUrl: './crushing-calculator.component.css'
})
export class CrushingCalculatorComponent {
  in_rpm: number = 256;
  in_stackSize: number = 1;
  in_recipeDuration: number = 100;
  in_delay: number = 0;
  out1: number = 0;
  out2: number = 0;

  get recipesKeys(): string[] { return Array.from(g_millstoneRecipes.keys()); }
  get recipesValues(): number[] { return Array.from(g_millstoneRecipes.values()); }
  get delayKeys(): string[] { return Array.from(g_inputDelays.keys()); }
  get delayValues(): number[] { return Array.from(g_inputDelays.values()); }

  get recipeInputHint(): string {
    return "Different recipes have different durations. If you can't see your input, select <all other recipes> or <custom>";
  }
  get recipeDurationHint(): string {
    return "Click the image on the left side of this page. There you will find a table with all available recipes and their duration";
  }
  get delayHint(): string {
    return "Different input methods have different delays.";
  }
  get warning(): string {
    return "These results may be slightly inaccurate due to irregular input delay.";
  }

  calculate() {
    if(this.in_rpm > 0) {
      let speed = this.in_rpm/50*4;
  
      let step = clamp(speed/Math.log2(this.in_stackSize), 0.25, 20);
      let processTicks = Math.ceil((this.in_recipeDuration - 19.999999)/step);
      let frames = processTicks+1+this.in_delay;
  
      this.out2 = frames / 20;
      this.out1 = this.in_stackSize / this.out2;
    }
    else {
      this.out1 = 0;
      this.out2 = 0;
    }
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
