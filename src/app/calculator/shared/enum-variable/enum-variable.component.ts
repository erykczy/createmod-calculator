import { Component, inject, Input } from '@angular/core';
import { CalculatorService } from '../../calculator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enum-variable',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enum-variable.component.html',
  styleUrl: './enum-variable.component.css'
})
export class EnumVariableComponent {
  @Input({required: true}) index!: number;
  @Input({required: true}) name!: string;
  @Input({required: true}) values!: string[];
  @Input() isOutput: boolean = false;
  value: string = "0";
  private calculatorService = inject(CalculatorService);

  ngOnInit() {
    if(!this.isOutput)
      this.calculatorService.setInput(this.index, Number(this.value));
  }

  ngDoCheck() {
    if(this.isOutput)
      this.value = String(this.calculatorService.getOutput(this.index));
  }

  onValueChanged() {
    if(!this.isOutput)
      this.calculatorService.setInput(this.index, Number(this.value));
  }
}
