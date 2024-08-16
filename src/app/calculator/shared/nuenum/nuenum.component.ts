import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnumComponent } from "../enum/enum.component";
import { NumberComponent } from "../number/number.component";

@Component({
  selector: 'app-nuenum',
  standalone: true,
  imports: [EnumComponent, NumberComponent],
  templateUrl: './nuenum.component.html',
  styleUrl: './nuenum.component.css'
})
export class NuenumComponent {
  @Input({required: true}) label_custom!: string;
  @Input({required: true}) id!: string;
  @Input({required: true}) keys!: string[];
  @Input({required: true}) values!: number[];
  @Input() hint?: string;
  @Input() hint_custom?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input()
  set value(newValue: number) {}
  @Output() valueChange = new EventEmitter<number>();
  @Output() userChange = new EventEmitter<number>();
  in_index: number = 0;
  in_custom: number = 0;

  get displayedKeys() {
    return ["<custom>", ...this.keys];
  }

  get value(): number {
    if (this.in_index === 0)
      return this.in_custom;
    else
      return this.values[this.in_index-1];
  }

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onUserChange() {
    this.userChange.emit(this.value);
  }
}
