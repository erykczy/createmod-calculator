import { Component } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { g_millstoneRecipes } from '../constants';

@Component({
  selector: 'app-millstone-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent, EnumComponent],
  templateUrl: './millstone-calculator.component.html',
  styleUrl: './millstone-calculator.component.css'
})
export class MillstoneCalculatorComponent {
  in_rpm: number = 256;
  in_recipeIndex: number = 0;
  in_customRecipeDuration: number = 100;
  out1: number = 0;
  out2: number = 0;

  get recipesValues(): string[] {
    let arr: string[] = Array.from(g_millstoneRecipes.keys());
    arr.unshift("<all other recipes>")
    arr.unshift("<custom>");
    return arr;
  }

  get recipeDuration(): number {
    if(this.in_recipeIndex == 0)
      return this.in_customRecipeDuration;
    if(this.in_recipeIndex == 1)
      return 100;
    return Array.from(g_millstoneRecipes.values())[this.in_recipeIndex-2];
  }

  get recipeInputHint(): string {
    return "Different recipes have different durations. If you can't see your input, select <all other recipes> or <custom>";
  }
  get recipeDurationHint(): string {
    return "Click the image on the left side of this page. There you will find a table with all available recipes and their duration";
  }

  calculate() {
    let mpf = Math.max(1, Math.min(512, this.in_rpm / 16));
    let gt = Math.ceil(this.recipeDuration / mpf) + 1;
    this.out2 = gt / 20;
    this.out1 = 1 / this.out2;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
