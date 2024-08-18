import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { DeployerCalculator, Process, Result } from './deployer.calculator';
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
  val_rpm: number = 256;
  val_time: number = 0;
  val_speed: number = 0;
  in_process: Process = 0;
  in_health: number = 10;
  in_damage: number = 4;
  private cdRef = inject(ChangeDetectorRef);

  get processes(): string[] {
    return [
      "Belt processing",
      "Killing",
      "Using/Placing/Inserting item"
    ]
  }

  ngOnInit() {
    this.calculateFromRpm();
  }

  calculateFromRpm() {
    this.updateValues(DeployerCalculator.calculateFromRpm(this.val_rpm, this.in_process, this.in_health, this.in_damage));
  }

  calculateFromSpeed() {
    this.updateValues(DeployerCalculator.calculateFromSpeed(this.val_speed, this.in_process, this.in_health, this.in_damage));
  }

  calculateFromTime() {
    this.updateValues(DeployerCalculator.calculateFromTime(this.val_time, this.in_process, this.in_health, this.in_damage));
  }

  updateValues(result: Result) {
    this.cdRef.detectChanges(); // update DOM with values given by user ( change detector is blind :( )
    this.val_rpm = result.rpm;
    this.val_time = result.time;
    this.val_speed = result.speed;
  }
}
