import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { decimal } from '../../constants';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  decimal = decimal;
  @Input() output: boolean = false;
  @Input() unit: string = "";
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter();
  
  get visibleValue(): string {
    if(this.output)
      return decimal(this.value)+this.unit;
    return String(this.value);
  }

  onValueChange(newValue: number) {
    if(newValue === null) newValue = 0;
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
