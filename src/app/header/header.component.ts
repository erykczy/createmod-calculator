import { Component, inject } from '@angular/core';
import { g_calculatorsData } from '../calculator/constants';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  get calculatorsData() {
    return g_calculatorsData;
  }
}
