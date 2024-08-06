import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enum',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enum.component.html',
  styleUrl: './enum.component.css'
})
export class EnumComponent {
  @Input() output: boolean = false;
  @Input({required: true}) values!: string[];
  @Input() value: number = 0;
  @Input() help?: string = undefined;
  @Input() helpUrl?: string = undefined;
  @Output() valueChange = new EventEmitter();
  
  onValueChange(newValue: string) {
    if(newValue === null) newValue = "0";
    this.value = Number(newValue);
    this.valueChange.emit(this.value);
  }
}
