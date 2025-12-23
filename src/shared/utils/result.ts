// Result pattern for handling success and failure cases
export type Result<T, E = Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(public readonly value: T) {}

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Success(fn(this.value));
  }

  flatMap<U, E>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }

  getOrElse(_defaultValue: T): T {
    return this.value;
  }

  getOrThrow(): T {
    return this.value;
  }
}

export class Failure<E> {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(public readonly error: E) {}

  map<U>(_fn: (value: never) => U): Result<U, E> {
    return this as unknown as Result<U, E>;
  }

  flatMap<U>(_fn: (value: never) => Result<U, E>): Result<U, E> {
    return this as unknown as Result<U, E>;
  }

  getOrElse<T>(defaultValue: T): T {
    return defaultValue;
  }

  getOrThrow(): never {
    throw this.error;
  }
}

export const ok = <T>(value: T): Success<T> => new Success(value);
export const fail = <E>(error: E): Failure<E> => new Failure(error);
