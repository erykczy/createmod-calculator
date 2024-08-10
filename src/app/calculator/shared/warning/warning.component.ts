import { Component, Input } from '@angular/core';
import { WarningType } from './warning.model';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  WarningType = WarningType;
  @Input({required: true}) warningType!: WarningType;
}
