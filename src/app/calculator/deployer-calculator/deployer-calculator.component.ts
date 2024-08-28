import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { DeployerCalculator, Options, Process, Result } from './deployer.calculator';
import { EnumComponent } from "../shared/enum/enum.component";
import { NuenumComponent } from "../shared/nuenum/nuenum.component";

@Component({
  selector: 'app-deployer-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent, EnumComponent, NuenumComponent],
  templateUrl: './deployer-calculator.component.html',
  styleUrl: './deployer-calculator.component.css'
})
export class DeployerCalculatorComponent {
  Process = Process;
  stressRatio: number = 4;
  val_stress: number = 0;
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  in_options: Options = {
     process: Process.OTHER,
     onContraption: 0,
     gathersItems: 0,
     health: 100,
     damage: 4,
     inputDelay: 0,
     beltRpm: 256
  };
  private cdRef = inject(ChangeDetectorRef);

  get inputDelaysKeys(): string[] {
    return [
      "No Delay",
      "Mechanical Belt"
    ]
  }
  get inputDelaysValues(): number[] {
    return [
      0,
      -1
    ]
  }
  get processes(): string[] {
    return [
      "Processing Other Items",
      "Killing",
      "Other (e.g. placing)"
    ]
  }
  get noYes(): string[] {
    return [
      "No",
      "Yes"
    ]
  }
  get hint1(): string {
    return "Outputting items causes extra delay";
  }
  get hint2(): string {
    return "Deployer on Contraption doesn't have several delays";
  }
  get delayHint(): string {
    return "Different input methods have different delays. This is necessary to be specified when, for example, you provide items to be processed by a belt below the deployer.";
  }

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(DeployerCalculator.calculateFromRpm(this.val_rpm, this.in_options));
  }

  calculateFromSpeed() {
    this.updateValues(DeployerCalculator.calculateFromSpeed(this.val_speed, this.in_options));
  }

  calculateFromTime() {
    this.updateValues(DeployerCalculator.calculateFromTime(this.val_time, this.in_options));
  }

  calculateFromStress() {
    this.val_rpm = this.val_stress / this.stressRatio;
    this.calculateFromRpm();
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
    this.val_stress = this.stressRatio * result.rpm;
  }
}
