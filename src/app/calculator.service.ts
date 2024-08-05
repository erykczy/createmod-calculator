import { Injectable } from "@angular/core";
import { Calculator } from "./calculator.model";

@Injectable({
  'providedIn': 'root'
})
export class CalculatorService {
  calculators: Calculator[] = [
    {
      name: 'Mechanical Drill',
      iconPath: 'assets/tabs/drill.png',
      inputs: [
        
        
      ],
      outputs: [

      ]
    }
  ]
}