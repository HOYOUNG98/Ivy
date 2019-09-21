export interface Handler {
  next: Handler;
  setNext: (handler: Handler) => void;
  process: (message: Message) => Message;
}

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
