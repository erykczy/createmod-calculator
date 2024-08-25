import { Component, inject } from '@angular/core';
import { g_calculatorsData } from '../calculator/constants';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipComponent } from "../calculator/shared/tooltip/tooltip.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TooltipComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  get calculatorsData() {
    return g_calculatorsData;
  }
}
