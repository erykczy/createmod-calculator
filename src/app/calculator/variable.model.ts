export interface Variable {
  name: string;
  type: VariableType;
}

export enum VariableType {
  NUMBER,
  HARDNESS_ENUM
}
