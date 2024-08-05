export interface NumberVariable {
  name: string;
}

export interface EnumVariable {
  name: string;
  values: { [value_name: string] : number };
}