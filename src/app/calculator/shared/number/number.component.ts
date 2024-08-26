import { Component, computed, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickSelectDirective } from '../../../click-select';
import { TooltipDirective } from '../../../tooltip';
import { CalculatorService } from '../../calculator.service';

// I present to you THE CLEANEST CODE OF ALL TIME
@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, ClickSelectDirective, TooltipDirective],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  id = input.required<string>();
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);
  unit = input<string>("");
  help = input<string | undefined>(undefined);
  readonly = input<boolean>(false);
  @Input()
  set value(newValue: number) {
    if(!this.initialized) {
      let savedValue = this.calculatorService.getSavedProperty(this.id());
      if(savedValue !== null) {
        Promise.resolve().then(() => {
          this.enteredValue.set(savedValue.toString());
          this.valueChange.emit(savedValue);
        });
      }
      else {
        this.enteredValue.set(newValue.toString());
      }
      this.initialized = true;
      return;
    }

    if(this.focused())
      this.bluredValue = newValue;
    else
      this.enteredValue.set(newValue.toString());
    this.calculatorService.saveProperty(this.id(), newValue);
  }
  @Output() valueChange = new EventEmitter<number>();
  @Output() userChange = new EventEmitter<number>();
  enteredValue = signal<string>("0");
  private bluredValue: number | null = null;
  private focused = signal<boolean>(false);
  private initialized: boolean = false;
  private calculatorService = inject(CalculatorService);
  
  onNgModelChange(newValueStr: string) {
    this.enteredValue.set(newValueStr);
    let newNumber = this.inputToNumber(newValueStr);
    
    this.calculatorService.saveProperty(this.id(), newNumber);
    this.valueChange.emit(newNumber);
    this.userChange.emit(newNumber);
  }

  onFocus() {
    this.focused.set(true);
  }

  onBlur() {
    this.focused.set(false);
    if(this.bluredValue !== null) {
      this.enteredValue.set(this.bluredValue.toString());
      this.bluredValue = null;
    }
    else {
      this.enteredValue.set(this.inputToNumber(this.enteredValue()).toString());
    }
  }
  
  inputToNumber(str: string) {
    let splitStr = str.match(/\d+(\.\d+)?/);
    let num = Number(splitStr ? splitStr[0] : '');
    if(num === null || Number.isNaN(num) || !Number.isFinite(num))
      num = this.min() === undefined ? 0 : this.min()!;
    if(this.min() !== undefined && num < this.min()!)
      num = this.min()!;
    if(this.max() !== undefined && num > this.max()!)
      num = this.max()!;
    return num;
  }

  ngModelValue = computed<string>(() => {
    if(this.focused() || !Number.isFinite(this.inputToNumber(this.enteredValue())))
      return this.enteredValue();
    else
      return this.enteredValue()+this.unit();
  })
}
