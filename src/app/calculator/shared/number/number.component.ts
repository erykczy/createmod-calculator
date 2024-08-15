import { ChangeDetectorRef, Component, computed, EventEmitter, inject, input, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { decimal, g_invisibleChar } from '../../constants';
import { ClickSelectDirective } from '../../../click-select';
import { CalculatorService } from '../../calculator.service';

// I present to you THE CLEANEST CODE OF ALL TIME
@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, ClickSelectDirective],
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
          this.realValue.set(savedValue);
          this.valueChange.emit(this.realValue());
        });
      }
      else {
        this.realValue.set(newValue);
      }
      this.initialized = true;
      return;
    }

    if(this.focused())
      this.bluredValue = newValue;
    else
      this.realValue.set(newValue);
    this.calculatorService.saveProperty(this.id(), newValue);
  }
  @Output() valueChange = new EventEmitter<number>();
  @Output() userChange = new EventEmitter<number>();
  realValue = signal<number>(0);
  private bluredValue: number | null = null;
  private focused = signal<boolean>(false);
  private initialized: boolean = false;
  private calculatorService = inject(CalculatorService);
  private cdRef = inject(ChangeDetectorRef);
  
  onNgModelChange(newValueStr: string) {
    let newValue = Number(newValueStr);
    this.realValue.set(newValue);
    this.cdRef.detectChanges(); // update DOM to possibly invalid value

    if(newValue === null || Number.isNaN(newValue) || !Number.isFinite(newValue))
      newValue = this.min() === undefined ? 0 : this.min()!;
    if(this.min() !== undefined && newValue < this.min()!)
      newValue = this.min()!;
    if(this.max() !== undefined && newValue > this.max()!)
      newValue = this.max()!;
    
    this.realValue.set(newValue);
    this.calculatorService.saveProperty(this.id(), this.realValue());
    this.valueChange.emit(this.realValue());
    this.userChange.emit(this.realValue());
  }

  onFocus() {
    this.focused.set(true);
  }

  onBlur() {
    this.focused.set(false);
    if(this.bluredValue !== null) {
      this.realValue.set(this.bluredValue);
      this.bluredValue = null;
    }
  }
  
  ngModelValue = computed<string>(() => {
    if(this.focused())
      return String(this.realValue());
    else
      return decimal(this.realValue())+this.unit();
  })
}
