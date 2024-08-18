import { Routes } from '@angular/router';
import { DrillCalculatorComponent } from './calculator/drill-calculator/drill-calculator.component';
import { MixerCalculatorComponent } from './calculator/mixer-calculator/mixer-calculator.component';
import { BulkProcessingCalculatorComponent } from './calculator/bulk-processing-calculator/bulk-processing-calculator.component';
import { PressCalculatorComponent } from './calculator/press-calculator/press-calculator.component';
import { MillstoneCalculatorComponent } from './calculator/millstone-calculator/millstone-calculator.component';
import { CrushingCalculatorComponent } from './calculator/crushing-calculator/crushing-calculator.component';
import { BeltCalculatorComponent } from './calculator/belt-calculator/belt-calculator.component';
import { SawCalculatorComponent } from './calculator/saw-calculator/saw-calculator.component';
import { DeployerCalculatorComponent } from './calculator/deployer-calculator/deployer-calculator.component';
import { ArmCalculatorComponent } from './calculator/arm-calculator/arm-calculator.component';
import { CrafterCalculatorComponent } from './calculator/crafter-calculator/crafter-calculator.component';
import { PumpCalculatorComponent } from './calculator/pump-calculator/pump-calculator.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'drill',
    pathMatch: 'full'
  },
  {
    path: 'drill',
    component: DrillCalculatorComponent
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
  },
  {
    path: 'saw',
    component: SawCalculatorComponent
  },
  {
    path: "deployer",
    component: DeployerCalculatorComponent
  },
  {
    path: "arm",
    component: ArmCalculatorComponent
  },
  {
    path: "crafter",
    component: CrafterCalculatorComponent
  },
  {
    path: "pump",
    component: PumpCalculatorComponent
  }
];
