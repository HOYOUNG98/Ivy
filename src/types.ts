// TODO: change type names with project names as prefixes

export interface Message {
  url: string;
  quantity: number;
  template: object;
  result: Array<object>;
}

export interface String {
  length: number;
  typeCase: string;
}

export interface Number {
  min: number;
  max: number;
}
