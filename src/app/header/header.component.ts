import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { g_calculatorsData } from '../calculator/constants';
import { TooltipDirective } from '../tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  get calculatorsData() {
    return g_calculatorsData;
  }
}
