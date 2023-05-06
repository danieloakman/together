export function iife<T extends () => any>(fn: T): ReturnType<T> {
  return fn();
}

export function capitalise(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}