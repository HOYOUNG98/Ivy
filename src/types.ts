// TODO: change type names with project names as prefixes

export interface Message {
  url: string;
  quantity: number;
  template: object;
  result: Array<object>;
}

export interface Req {
  type: 'number' | 'string';
}

export interface StringReq extends Req {
  type: 'string';
  length?: number;
  typeCase?: string;
}

export interface NumberReq extends Req {
  type: 'number';
  min?: number;
  max?: number;
}
