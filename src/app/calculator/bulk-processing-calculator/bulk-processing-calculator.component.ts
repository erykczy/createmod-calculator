import { Component } from '@angular/core';
import { NumberComponent } from "../shared/number/number.component";
import { OutputSideComponent } from "../shared/output-side/output-side.component";
import { InputSideComponent } from "../shared/input-side/input-side.component";
import { decimal } from '../constants';

@Component({
  selector: 'app-bulk-processing-calculator',
  standalone: true,
  imports: [NumberComponent, OutputSideComponent, InputSideComponent],
  templateUrl: './bulk-processing-calculator.component.html',
  styleUrl: './bulk-processing-calculator.component.css'
})
export class BulkProcessingCalculatorComponent {
  in_stackSize: number = 1;
  in_fansAmount: number = 1;
  out1: number = 0;
  out2: number = 0;
  
  ngOnInit() { this.calculate(); }

  get fansHint(): string {
    return "Multiple fans applying the same processing effect on the same block divide the processing time";
  }

  calculate() {
    let time: number;
    if(this.in_stackSize <= 16)
      time = 7.5;
    else if(this.in_stackSize <= 32)
      time = 15;
    else if(this.in_stackSize <= 48)
      time = 22.5;
    else
      time = 30;
    time /= this.in_fansAmount;
    this.out2 = decimal(time)!;
    this.out1 = decimal(this.in_stackSize / time)!;
  }
}
