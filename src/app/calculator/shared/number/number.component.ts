import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { decimal, g_invisibleChar } from '../../constants';
import { MinMaxDirective } from '../../../min-max.directive';
import { ClickSelectDirective } from '../../../click-select';
import { CalculatorService } from '../../calculator.service';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, MinMaxDirective, ClickSelectDirective],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  decimal = decimal;
  @Input() id?: string;
  @Input() output: boolean = false;
  @Input() unit: string = "";
  @Input() min?: number = undefined;
  @Input() max?: number = undefined;
  @Input() help?: string = undefined;
  @Input() helpUrl?: string = undefined;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter();
  private calculatorService = inject(CalculatorService);
  private cdRef = inject(ChangeDetectorRef);
  
  get ngModelValue(): string {
    if(this.output)
      return decimal(this.value)+g_invisibleChar+this.unit;
    return String(this.value);
  }

  onNgModelChange(newValueStr: string) {
    let newValue = Number(newValueStr);
    this.value = newValue;
    this.cdRef.detectChanges();
    if(newValue === null)
      newValue = this.min === undefined ? 0 : this.min;
    if(this.min !== undefined && newValue < this.min)
      newValue = this.min;
    if(this.max !== undefined && newValue > this.max)
      newValue = this.max;
    
    this.value = newValue;
    this.calculatorService.saveProperty(this.id!, this.value);
    this.valueChange.emit(this.value);
  }

  ngOnInit() {
    if(this.output)
      return;
    if(this.id === undefined)
      console.error("id is undefinded");
    window.setTimeout(() => {
      let savedValue = this.calculatorService.getSavedProperty(this.id!);
      if(savedValue !== null) {
        this.value = savedValue;
        this.valueChange.emit(this.value);
      }
    });
  }
}
