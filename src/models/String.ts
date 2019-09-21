export class String {
  protected value: string;
  protected length: number;

  protected constructor({ value, length }: String) {
    length ? (this.length = length) : (this.length = 60);
    this.value = String.createValue(this.length);
  }

  protected static createValue(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static parseString(value: string) {}
}
