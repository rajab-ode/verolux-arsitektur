// Generic utility types

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Extract keys of type
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

// Omit by value type
export type OmitByValueType<T, V> = Pick<T, KeysOfType<T, Exclude<T[keyof T], V>>>;

// Function types
export type AsyncFunction<T = void> = () => Promise<T>;
export type Callback<T = void> = (error: Error | null, result?: T) => void;

// Constructor type
export type Constructor<T = object> = new (...args: unknown[]) => T;
