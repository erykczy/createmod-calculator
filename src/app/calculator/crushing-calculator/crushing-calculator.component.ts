import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { clamp, g_crushingRecipes, g_delays, g_inputDelays, g_millstoneRecipes } from '../constants';
import { NuenumComponent } from "../shared/nuenum/nuenum.component";
import { CrushingCalculator, Result } from './crushing.calculator';

@Component({
  selector: 'app-crushing-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, EnumComponent, InputSideComponent, NuenumComponent],
  templateUrl: './crushing-calculator.component.html',
  styleUrl: './crushing-calculator.component.css'
})
export class CrushingCalculatorComponent {
  val_rpm: number = 256;
  in_stackSize: number = 1;
  in_recipeDuration: number = 100;
  in_delay: number = 0;
  val_speed: number = 0;
  val_time: number = 0;
  cdRef = inject(ChangeDetectorRef);

  ngOnInit() { this.calculateFromRpm(); }

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

  calculateFromRpm() {
    this.updateValues(CrushingCalculator.calculateFromRpm(this.val_rpm, this.in_recipeDuration, this.in_stackSize, this.in_delay));
  }

  calculateFromTime() {
    this.updateValues(CrushingCalculator.calculateFromTime(this.val_time, this.in_recipeDuration, this.in_stackSize, this.in_delay));
  }

  calculateFromSpeed() {
    this.updateValues(CrushingCalculator.calculateFromSpeed(this.val_speed, this.in_recipeDuration, this.in_stackSize, this.in_delay));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
  }

}
