import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../calculator.service';

@Component({
  selector: 'app-number-variable',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './number-variable.component.html',
  styleUrl: './number-variable.component.css'
})
export class NumberVariableComponent {
  @Input({required: true}) index!: number;
  @Input({required: true}) name!: string;
  @Input() isOutput: boolean = false;
  value: number = 0;
  private calculatorService = inject(CalculatorService);

  ngOnInit() {
    if(!this.isOutput)
      this.calculatorService.setInput(this.index, this.value);
  }

  ngDoCheck() {
    if(this.isOutput)
      this.value = this.calculatorService.getOutput(this.index);
  }

  onValueChanged() {
    if(!this.isOutput)
      this.calculatorService.setInput(this.index, this.value);
  }
}
