import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { decimal, g_invisibleChar } from '../../constants';
import { ClickSelectDirective } from '../../../click-select';
import { CalculatorService } from '../../calculator.service';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, ClickSelectDirective],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  decimal = decimal;
  @Input() id!: string; // TODO: make required
  @Input() output: boolean = false; // TODO: deprecated
  @Input() unit: string = "";
  @Input() min?: number = undefined;
  @Input() max?: number = undefined;
  @Input() help?: string = undefined;
  @Input()
  set value(newValue: number) {
    if(this.focused)
      this.bluredValue = newValue;
    else
      this.realValue = newValue;
  }
  @Output() valueChange = new EventEmitter();
  @Output() userChange = new EventEmitter();
  private realValue: number = 0;
  private bluredValue: number | null = null;
  private calculatorService = inject(CalculatorService);
  private cdRef = inject(ChangeDetectorRef);
  focused: boolean = false;
  
  get ngModelValue(): string {
    if(this.focused)
      return String(this.realValue);
    else
      return decimal(this.realValue)+this.unit;
  }

  onNgModelChange(newValueStr: string) {
    let newValue = Number(newValueStr);
    this.realValue = newValue;
    this.cdRef.detectChanges();

    if(newValue === null || Number.isNaN(newValue) || !Number.isFinite(newValue))
      newValue = this.min === undefined ? 0 : this.min;
    if(this.min !== undefined && newValue < this.min)
      newValue = this.min;
    if(this.max !== undefined && newValue > this.max)
      newValue = this.max;
    
    this.realValue = newValue;
    this.calculatorService.saveProperty(this.id, this.realValue);
    this.valueChange.emit(this.realValue);
    this.userChange.emit(this.realValue);
  }

  ngOnInit() {
    Promise.resolve().then(() => {
      let savedValue = this.calculatorService.getSavedProperty(this.id);
      if(savedValue !== null) {
        this.realValue = savedValue;
        this.valueChange.emit(this.realValue);
      }
    });
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    if(this.bluredValue !== null) {
      this.realValue = this.bluredValue;
      this.calculatorService.saveProperty(this.id, this.realValue);
      this.bluredValue = null;
    }
  }
}
