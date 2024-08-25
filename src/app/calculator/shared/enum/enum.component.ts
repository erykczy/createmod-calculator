import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../calculator.service';
import { TooltipComponent } from "../tooltip/tooltip.component";

@Component({
  selector: 'app-enum',
  standalone: true,
  imports: [FormsModule, TooltipComponent],
  templateUrl: './enum.component.html',
  styleUrl: './enum.component.css'
})
export class EnumComponent {
  @Input({required: true}) id!: string;
  @Input({required: true}) values!: string[];
  @Input() help?: string = undefined;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  @Output() userChange = new EventEmitter<number>();
  private calculatorService = inject(CalculatorService);
  
  get ngModelValue(): string {
    return this.value.toString();
  }

  onngModelValueChange(newValue: string) {
    this.value = Number(newValue);
    this.valueChange.emit(this.value);
    this.calculatorService.saveProperty(this.id, this.value);
    this.userChange.emit(this.value);
  }

  ngOnInit() {
    let savedValue = this.calculatorService.getSavedProperty(this.id);
    if(savedValue !== null) {
      Promise.resolve().then(() => {
        this.value = savedValue;
        this.valueChange.emit(this.value);
      });
    }
  }
}
