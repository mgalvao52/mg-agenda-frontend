export default class Response<T> {
  public error: boolean;
  public data: T | undefined;
  public message: string = "";
  constructor(error: boolean) {
    this.error = error;
  }
}
