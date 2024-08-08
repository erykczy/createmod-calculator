import { Component } from '@angular/core';
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { clamp } from '../constants';
import { WarningComponent } from "../shared/warning/warning.component";

@Component({
  selector: 'app-mixer-calculator',
  standalone: true,
  imports: [InputSideComponent, NumberComponent, OutputSideComponent, WarningComponent],
  templateUrl: './mixer-calculator.component.html',
  styleUrl: './mixer-calculator.component.css'
})
export class MixerCalculatorComponent {
  in_rpm: number = 256;
  out1: number = 0;
  out2: number = 0;

  calculate() {
    this.out2 = (clamp((Math.log2(Math.floor(512 / this.in_rpm))) * Math.ceil(1 * 15) + 1, 1, 512)+1) / 20;
    this.out1 = 1 / this.out2;
  }

  ngOnInit() { this.calculate(); }
  ngDoCheck() { this.calculate(); }
}
