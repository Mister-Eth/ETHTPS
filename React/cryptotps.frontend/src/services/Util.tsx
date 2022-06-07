export class Util {
    static isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
      return typeof obj === 'undefined' || obj === null;
    }
  }