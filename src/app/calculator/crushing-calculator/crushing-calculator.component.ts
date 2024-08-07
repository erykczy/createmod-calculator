import { Component } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { clamp, g_crushingRecipes, g_inputDelays, g_millstoneRecipes } from '../constants';

@Component({
  selector: 'app-crushing-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, EnumComponent, InputSideComponent],
  templateUrl: './crushing-calculator.component.html',
  styleUrl: './crushing-calculator.component.css'
})
export class CrushingCalculatorComponent {
  in_rpm: number = 256;
  in_stackSize: number = 1;
  in_recipeIndex: number = 0;
  in_customRecipeDuration: number = 100;
  in_delayIndex: number = 0;
  in_customDelay: number = 0;
  out1: number = 0;
  out2: number = 0;

  get delayValues(): string[] {
    let arr: string[] = Array.from(g_inputDelays.keys());
    arr.unshift("<custom>");
    return arr;
  }

  get delay(): number {
    if(this.in_delayIndex == 0)
      return this.in_customDelay;
    return Array.from(g_inputDelays.values())[this.in_delayIndex-1];
  }

  get recipesValues(): string[] {
    let arr: string[] = Array.from(g_crushingRecipes.keys());
    arr.unshift("<all other recipes>")
    arr.unshift("<custom>");
    return arr;
  }

  get recipeDuration(): number {
    if(this.in_recipeIndex == 0)
      return this.in_customRecipeDuration;
    if(this.in_recipeIndex == 1)
      return 100;
    return Array.from(g_crushingRecipes.values())[this.in_recipeIndex-2];
  }

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
    let speed = this.in_rpm/50*4;

    let remainingTime = this.recipeDuration;
    let appliedRecipe = false;
    let frame: number;
    for(frame = 0; true; frame++) {
      let processingSpeed = clamp((speed) / (!appliedRecipe ? Math.log2(this.in_stackSize) : 1), 0.25, 20);//clamp(speed / Math.log2(this.in_stackSize), 0.25, 20);
      remainingTime -= processingSpeed;
      
      if(remainingTime < 20 && !appliedRecipe) {
        appliedRecipe = true;
        remainingTime = 0;
        continue;
      }
      if(remainingTime <= 0)
        break;
    }
    let frames: number = frame + 1;
    frames += this.delay;

    this.out2 = frames / 20;
    this.out1 = 1 / this.out2;
    // let a = this.recipeDuration - 20;
    // let _b = this.in_rpm * 4 / 50 / Math.log2(this.in_stackSize);
    // let b = Math.max(0.25, Math.min(20, _b));
    // let time = Math.ceil(a / b)+3;
    // this.out2 = time / 20;
    // this.out1 = this.in_stackSize / this.out2;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
