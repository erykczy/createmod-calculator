import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { EnumComponent } from "../shared/enum/enum.component";
import { g_millstoneRecipes } from '../constants';
import { NuenumComponent } from "../shared/nuenum/nuenum.component";
import { MillstoneCalculator, Result } from './millstone.calculator';

@Component({
  selector: 'app-millstone-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent, EnumComponent, NuenumComponent],
  templateUrl: './millstone-calculator.component.html',
  styleUrl: './millstone-calculator.component.css'
})
export class MillstoneCalculatorComponent {
  val_rpm: number = 256;
  in_recipeDuration: number = 0;
  val_time: number = 0;
  val_speed: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() { this.calculateFromRpm(); }

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

  calculateFromRpm() {
    this.updateValues(MillstoneCalculator.calculateFromRpm(this.val_rpm, this.in_recipeDuration));
  }

  calculateFromSpeed() {
    this.updateValues(MillstoneCalculator.calculateFromSpeed(this.val_speed, this.in_recipeDuration));
  }

  calculateFromTime() {
    this.updateValues(MillstoneCalculator.calculateFromTime(this.val_time, this.in_recipeDuration));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
  }

}
