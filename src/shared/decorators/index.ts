// Placeholder for decorators
// Add custom decorators here when using experimental decorators

export function Log() {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      console.log(`Calling ${propertyKey} with args:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`Result of ${propertyKey}:`, result);
      return result;
    };

    return descriptor;
  };
}

export function Memoize() {
  const cache = new Map<string, unknown>();

  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };

    return descriptor;
  };
}
