import { Routes } from '@angular/router';
import { DrillTimeSpeedCalculatorComponent } from './calculator/drill-calculator/time-speed/drill-time-speed-calculator.component';
import { MixerCalculatorComponent } from './calculator/mixer-calculator/mixer-calculator.component';
import { BulkProcessingCalculatorComponent } from './calculator/bulk-processing-calculator/bulk-processing-calculator.component';
import { PressCalculatorComponent } from './calculator/press-calculator/press-calculator.component';
import { MillstoneCalculatorComponent } from './calculator/millstone-calculator/millstone-calculator.component';
import { CrushingCalculatorComponent } from './calculator/crushing-calculator/crushing-calculator.component';
import { BeltCalculatorComponent } from './calculator/belt-calculator/belt-calculator.component';
import { DrillRpmTimeCalculatorComponent } from './calculator/drill-calculator/rpm-time/drill-rpm-time-calculator/drill-rpm-time-calculator.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'drill',
    pathMatch: 'full'
  },
  {
    path: 'drill',
    redirectTo: 'drill/time-speed'
  },
  {
    path: 'drill/time-speed',
    component: DrillTimeSpeedCalculatorComponent
  },
  {
    path: 'drill/rpm-time',
    component: DrillRpmTimeCalculatorComponent
  },

  {
    path: 'mixer',
    component: MixerCalculatorComponent
  },
  {
    path: 'fan',
    component: BulkProcessingCalculatorComponent
  },
  {
    path: 'press',
    component: PressCalculatorComponent
  },
  {
    path: 'millstone',
    component: MillstoneCalculatorComponent
  },
  {
    path: 'crushing',
    component: CrushingCalculatorComponent
  },
  {
    path: 'belt',
    component: BeltCalculatorComponent
  }
];
