import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { decimal, g_invisibleChar } from '../../constants';
import { MinMaxDirective } from '../../../min-max.directive';
import { ClickSelectDirective } from '../../../click-select';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, MinMaxDirective, ClickSelectDirective],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  decimal = decimal;
  @Input() output: boolean = false;
  @Input() unit: string = "";
  @Input() value: number = 0;
  @Input() min?: number = undefined;
  @Input() max?: number = undefined;
  @Input() help?: string = undefined;
  @Input() helpUrl?: string = undefined;
  @Output() valueChange = new EventEmitter();
  
  get visibleValue(): string {
    if(this.output)
      return decimal(this.value)+g_invisibleChar+this.unit;
    return String(this.value);
  }

  onValueChange(newValueStr: string) {
    let newValue = Number(newValueStr);
    if(newValue === null) newValue = 0;
    if(this.min !== undefined && newValue < this.min)
      newValue = this.min;
    if(this.max !== undefined && newValue > this.max)
      newValue = this.max;
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
