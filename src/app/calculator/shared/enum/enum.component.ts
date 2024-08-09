import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../../calculator.service';

@Component({
  selector: 'app-enum',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enum.component.html',
  styleUrl: './enum.component.css'
})
export class EnumComponent {
  @Input() id?: string;
  @Input({required: true}) values!: string[];
  @Input() output: boolean = false;
  @Input() help?: string = undefined;
  @Input() helpUrl?: string = undefined;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter();
  private calculatorService = inject(CalculatorService);
  private cdRef = inject(ChangeDetectorRef);
  
  get ngModelValue(): string {
    return this.value.toString();
  }

  onngModelValueChange(newValue: string) {
    this.value = Number(newValue);
    this.valueChange.emit(this.value);
    this.calculatorService.saveProperty(this.id!, this.value);
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
