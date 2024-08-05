import { CalculatorData } from "./calculator.model"

export function decimal(num: number): number {
  return Number(num.toFixed(3));
}

export var g_calculatorsData: CalculatorData[] = [
  {
    name: "Mechanical Drill",
    iconPath: "assets/icons/drill.png"
  },
  {
    name: "Mechanical Mixer",
    iconPath: "assets/icons/mixer.png"
  }
]

export var g_hardness = new Map<string, number>([
  ["cobblestone", 2],
  ["obsidian", 50]
])