import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { BeltCalculator, Result } from './belt.calculator';

@Component({
  selector: 'app-belt-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent],
  templateUrl: './belt-calculator.component.html',
  styleUrl: './belt-calculator.component.css'
})
export class BeltCalculatorComponent {
  stressRatio: number = 0;
  val_stress: number = 0;
  val_rpm: number = 256;
  in_stackSize: number = 1;
  in_beltLength: number = 1;
  val_time: number = 0;
  val_itemsSpeed: number = 0;
  val_stacksSpeed: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit() { this.calculateFromRpm(); }
  
  get hint1(): string {
    return "Traverse time may be shorter depending on how you input and output items"
  }

  calculateFromRpm() {
    this.updateValues(BeltCalculator.calculateFromRpm(this.val_rpm, this.in_stackSize, this.in_beltLength));
  }

  calculateFromItemsSpeed() {
    this.updateValues(BeltCalculator.calculateFromItemsSpeed(this.val_itemsSpeed, this.in_stackSize, this.in_beltLength));
  }

  calculateFromStacksSpeed() {
    this.updateValues(BeltCalculator.calculateFromStacksSpeed(this.val_stacksSpeed, this.in_stackSize, this.in_beltLength));
  }

  calculateFromTime() {
    this.updateValues(BeltCalculator.calculateFromTime(this.val_time, this.in_stackSize, this.in_beltLength));
  }

  calculateFromStress() {
    this.cdRef.detectChanges();
    this.val_stress = 0;
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_itemsSpeed = result.itemsSpeed;
    this.val_stacksSpeed = result.stacksSpeed;
    this.val_stress = this.stressRatio * result.rpm;
  }

}
