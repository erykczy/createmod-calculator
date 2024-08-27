import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CalculatorService } from './calculator/calculator.service';
import { TooltipDirective } from './tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, TooltipDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'createmod-calculator';
  switchTabAnimation: boolean = false;
  private calculatorService = inject(CalculatorService);
  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof ActivationStart) {
        this.calculatorService.setSelectedCalculator(val.snapshot.url[0].path);
        this.onCalculatorChanged();
      }
    })
  }

  get calculator() {
    return this.calculatorService.getSelectedCalculator();
  }

  onCalculatorChanged() {
    this.switchTabAnimation = true;
  }

  onAnimationend() {
    this.switchTabAnimation = false;
  }
}
