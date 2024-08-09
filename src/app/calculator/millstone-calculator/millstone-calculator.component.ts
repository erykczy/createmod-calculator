import { Component } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { g_millstoneRecipes } from '../constants';
import { NuenumComponent } from "../shared/nuenum/nuenum.component";

@Component({
  selector: 'app-millstone-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent, EnumComponent, NuenumComponent],
  templateUrl: './millstone-calculator.component.html',
  styleUrl: './millstone-calculator.component.css'
})
export class MillstoneCalculatorComponent {
  in_rpm: number = 256;
  in_recipeDuration: number = 0;
  out1: number = 0;
  out2: number = 0;

  get recipesKeys(): string[] {
    return Array.from(g_millstoneRecipes.keys());
  }
  get recipesValues(): number[] {
    return Array.from(g_millstoneRecipes.values());
  }

  get recipeInputHint(): string {
    return "Different recipes have different durations. If you can't see your input, select <all other recipes> or <custom>";
  }
  get recipeDurationHint(): string {
    return "Click the image on the left side of this page. There you will find a table with all available recipes and their duration";
  }

  calculate() {
    if(this.in_rpm > 0) {
      let mpf = Math.max(1, Math.min(512, Math.floor(this.in_rpm / 16)));
      let gt = Math.ceil(this.in_recipeDuration / mpf) + 1;
      this.out2 = gt / 20;
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
