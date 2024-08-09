import { CalculatorData } from "./calculator.model"

export var g_invisibleChar: string = "​";

export function decimal(num: number): number {
  return Number(num.toFixed(3));
}

export function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

export function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}

export var g_calculatorsData: CalculatorData[] = [
  {
    name: "Mechanical Drill",
    id: "drill",
    iconPath: "assets/icons/drill.png",
    wikiPage: "https://create.fandom.com/wiki/Mechanical_Drill"
  },
  {
    name: "Mechanical Mixer",
    id: "mixer",
    iconPath: "assets/icons/mixer.png",
    wikiPage: "https://create.fandom.com/wiki/Mechanical_Mixer"
  },
  {
    name: "Bulk Processing",
    id: "fan",
    iconPath: "assets/icons/fan.png",
    wikiPage: "https://create.fandom.com/wiki/Encased_Fan"
  },
  {
    name: "Mechanical Press",
    id: "press",
    iconPath: "assets/icons/press.png",
    wikiPage: "https://create.fandom.com/wiki/Mechanical_Press"
  },
  {
    name: "Millstone",
    id: "millstone",
    iconPath: "assets/icons/millstone.png",
    wikiPage: "https://create.fandom.com/wiki/Millstone#Recipe_Table"
  },
  {
    name: "Crushing",
    id: "crushing",
    iconPath: "assets/icons/crushing.png",
    wikiPage: "https://create.fandom.com/wiki/Crushing_Wheel#Recipe_Duration_Table"
  },
  {
    name: "Mechanical Belt",
    id: "belt",
    iconPath: "assets/icons/belt.png",
    wikiPage: "https://create.fandom.com/wiki/Mechanical_Belt"
  }
];

export var g_hardness = new Map<string, number>([
  ["cobblestone", 2],
  ["stone", 1.5],
  ["basalt", 1.25],
  ["obsidian", 50]
]);

export var g_delays = new Map<string, number>([
  ["no delay", 0],
  ["generator (any)", 1.5] 
]);

export var g_inputDelays = new Map<string, number>([
  ["funnel (fastest)", 1],
  ["chute (slower)", 3],
  ["thrown (slowest, not recommended)", 27]
]);

export var g_millstoneRecipes = new Map<string, number>([
  ["clay block", 50],
  ["cactus", 50],
  ["sea pickle", 50],
  ["sugar cane", 50],
  ["azure bluet", 50],
  ["blue orchid", 50],
  ["fern", 50],
  ["large fern", 50],
  ["allium", 50],
  ["lily of the valley", 50],
  ["rose bush", 50],
  ["oxeye daisy", 50],
  ["poppy", 50],
  ["dandelion", 50],
  ["cornflower", 50],
  ["wither rose", 50],
  ["orange tulip", 50],
  ["red tulip", 50],
  ["white tulip", 50],
  ["pink tulip", 50],

  ["bone meal", 70],
  ["coca beans", 70],
  ["beetroot", 70],

  ["wool", 100],
  ["bone", 100],
  ["ink sack", 100],
  ["charcoal", 100],
  ["coal", 100],
  ["lapis lazuli", 100],
  ["lilac", 100],
  ["peony", 100],
  ["sunflower", 100],
  ["tall grass", 100],

  ["sandstone", 150],
  ["wheat", 150],

  ["granite", 200],
  ["terracotta", 200],
  ["andesite", 200],
  ["saddle", 200],

  ["calcite", 250],
  ["dripstone block", 250],
  ["cobblestone", 250],
  ["gravel", 250]
]);

export var g_crushingRecipes = new Map<string, number>([
  ["clay block", 50],
  ["cactus", 50],
  ["sea pickle", 50],
  ["sugar cane", 50],
  ["azure bluet", 50],
  ["blue orchid", 50],
  ["fern", 50],
  ["large fern", 50],
  ["allium", 50],
  ["lily of the valley", 50],
  ["rose bush", 50],
  ["oxeye daisy", 50],
  ["poppy", 50],
  ["dandelion", 50],
  ["cornflower", 50],
  ["wither rose", 50],
  ["orange tulip", 50],
  ["red tulip", 50],
  ["white tulip", 50],
  ["pink tulip", 50],

  ["bone meal", 70],
  ["coca beans", 70],
  ["beetroot", 70],

  ["wool", 100],
  ["bone", 100],
  ["ink sack", 100],
  ["charcoal", 100],
  ["coal", 100],
  ["lapis lazuli", 100],
  ["lilac", 100],
  ["peony", 100],
  ["sunflower", 100],
  ["tall grass", 100],
  ["blaze rod", 100],

  ["sandstone", 150],
  ["wheat", 150],
  ["prismarine crystal", 150],
  ["coal ore", 150],
  ["amethist cluster", 150],
  ["glowstone", 150],
  ["amethist block", 150],

  ["granite", 200],
  ["terracotta", 200],
  ["andesite", 200],
  ["saddle", 200],
  ["horse armor", 200],

  ["calcite", 250],
  ["dripstone block", 250],
  ["cobblestone", 250],
  ["gravel", 250],
  ["copper ore", 250],
  ["zinc ore", 250],
  ["iron ore", 250],
  ["gold ore", 250],
  ["redstone ore", 250],
  ["lapis ore", 250],
  ["netherrack", 250],

  ["diorite", 350],
  ["tuff", 350],
  ["diamond ore", 350],
  ["emerald ore", 350],
  ["deepslate copper ore", 350],
  ["deepslate zinc ore", 350],
  ["deepslate iron ore", 350],
  ["deepslate gold ore", 350],
  ["deepslate redstone ore", 350],
  ["deepslate lapis ore", 350],
  ["nether gold ore", 350],
  ["nether quarts ore", 350],

  ["raw ore (any)", 400],

  ["deepslate diamond ore", 450],
  ["deepslate emerald ore", 450],

  ["obsidian", 500]
])