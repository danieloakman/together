import { writable, type Readable, derived, type Writable, get } from 'svelte/store';
import { asyncable as _asyncable, type Asyncable } from 'svelte-asyncable';
import type { Identifiable, Reloadable, SafeAwaitDepth1, Stores, StoresValues } from '$types';
import { readFile, writeFile } from './fs';
import { preferences } from './preferences';
import { noop } from 'svelte/internal';
import { isNil } from 'lodash-es';
export { Asyncable };

/** A Readable that always returns undefined. */
export function empty(): Readable<undefined> {
	return {
		subscribe: (_run) => {
			return noop;
		}
	};
}

export function reloadable<T extends Promise<any>>(getter: () => T): Reloadable<Awaited<T>>;
export function reloadable<T extends Stores, U extends Promise<any>>(
	stores: T,
	getter: ($stores: StoresValues<T>) => U
): Reloadable<Awaited<U>>;
export function reloadable(...args: any[]): Reloadable<any> {
	const [stores, getter] = args.length === 1 ? [[], args[0]] : args;

	const reload = counter();
	const derived$ = derived([...stores, reload], (values) => values.slice(0, -1));

	const { subscribe, set, update } = writable<Awaited<any>>(undefined, (set) => {
		return derived$.subscribe(async (values = []) => {
			getter(values)
				.then((value: any) => {
					if (value) set(value);
				})
				.catch((err: Error) => {
					console.error('Error getting reloadable value:', err);
				});
			// let value = getter(values);
			// if (value === undefined) return;
			// value = Promise.resolve(value);
			// set(value);
		});
	});

	return {
		subscribe,
		reload: () => reload.inc(),
		get: () => new Promise((resolve) => subscribe(resolve)()),
		set,
		update
	};
}

/**
 * Provides a writable that isn't actually "writable". Every time `set` or `update` is called it increments
 * the internal integer. Can be used as an easy way to trigger a reload for example.
 */
export function counter(start = 0) {
	const { subscribe, update } = writable<number>(start);
	return {
		inc: () => update((n) => n + 1),
		dec: () => update((n) => n - 1),
		reset: () => update(() => start),
		get get() {
			return get({ subscribe });
		},
		subscribe
	};
}

/**
 * Create an Asynable. This is effectively a wrapper for `asyncable` from `svelte-asyncable` that fixed some
 * typing issues and adds some convenience.
 */
export function asyncable<T>(
	getter: () => T,
	setter?: (
		newValue: SafeAwaitDepth1<T>,
		oldValue?: SafeAwaitDepth1<T>
	) => T | Promise<T> | void | Promise<void>
): Asyncable<SafeAwaitDepth1<T>>;
export function asyncable<T extends Stores, U>(
	stores: T,
	getter: ($values: StoresValues<T>) => U,
	setter?: (
		newValue: SafeAwaitDepth1<U>,
		oldValue?: SafeAwaitDepth1<U>
	) => U | Promise<U> | void | Promise<void>
): Asyncable<SafeAwaitDepth1<U>>;
export function asyncable<T>(
	source: Writable<T>,
	options?: { readonly?: boolean }
): Asyncable<SafeAwaitDepth1<T>>;
export function asyncable<T>(source: Readable<T>): Asyncable<SafeAwaitDepth1<T>>;
export function asyncable<T>(...args: any[]) {
	if (typeof args[0] === 'function') {
		const [getter, setter] = args;
		return _asyncable((...values: any[]) => getter(values.length > 1 ? values : values[0]), setter);
	} else if (
		('subscribe' in args[0] ||
			(Array.isArray(args[0]) && args[0].every((arg) => 'subscribe' in arg))) &&
		typeof args[1] === 'function'
	) {
		const [source, getter, setter] = args;
		return _asyncable(
			(...values: any[]) => getter(values.length > 1 ? values : values[0]),
			setter,
			Array.isArray(source) ? source : ([source] as any)
		);
	}

	// Handle cases where Readables or Writables and options are passed:
	const [source, options = {}] = args;
	return {
		subscribe: source.subscribe,
		get: async () => get(source),
		// Just silently ignore the setter if the source is readonly with using `noop`:
		set: !options.readonly && 'set' in source ? source.set : noop,
		update: !options.readonly && 'update' in source ? source.update : noop
	};
}

export class EntityStore<T extends Identifiable> implements Readable<Promise<T[]>> {
	// TODO: Could maybe make this class more efficient by using a map<ID, array index>.
	// Also, there's no internal ID checking against values already in the store.
	constructor(protected source: Asyncable<T[]>) {}

	get subscribe() {
		return this.source.subscribe;
	}

	async get(): Promise<T[]>;
	async get(id: string): Promise<T | undefined>;
	async get(id?: string) {
		const entities = await this.source.get();
		if (id) return entities.find((e) => e.id === id);
		return entities;
	}

	// Don't think this method is a good idea. Just not type safe enough:
	// select(
	// 	id: string
	// ): StoreMethods<
	// 	Promise<T | undefined>,
	// 	(value: Partial<T> & Identifiable) => void,
	// 	(fn: (value: T) => Partial<T>) => void
	// > &
	// 	HasGet<Promise<T | undefined>> {
	// 	return asyncable(
	// 		this.source,
	// 		async ($source) => {
	// 			return (await $source).find((e) => e.id === id);
	// 		},
	// 		(value) => {
	// 			if (value) this.update(id, () => value);
	// 		}
	// 	) as any;
	// }

	set(...values: (Partial<T> & Identifiable)[]) {
		this.source.update((entities) => {
			for (const value of values) {
				const idx = entities.findIndex((e) => e.id === value.id);
				if (idx) Object.assign(entities[idx], value);
			}
			return entities;
		});
	}

	update(id: string, updater: (entity: T) => Partial<T>) {
		this.source.update((entities) => {
			const idx = entities.findIndex((e) => e.id === id);
			if (idx) Object.assign(entities[idx], updater(entities[idx]));
			return entities;
		});
	}

	create(...newEntities: T[]) {
		this.source.update((entities) => {
			entities.push(...newEntities);
			return entities;
		});
	}

	delete(...ids: string[]) {
		this.source.update((entities) => {
			for (let i = entities.length - 1; i >= 0; i--) {
				if (ids.includes(entities[i].id)) {
					entities.splice(i, 1);
				}
			}
			return entities;
		});
	}
}

/** Alias for `new EntityStore(source)`. */
export function entityStore<T extends Identifiable>(source: Asyncable<T[]>) {
	return new EntityStore(source);
}

export function fileStore<T>(path: string, initialValue: T, options: { readonly?: boolean } = {}) {
	return asyncable(
		async () => {
			return (await readFile<T>(path)) ?? initialValue;
		},
		options.readonly
			? undefined
			: async (newValue: T) => {
					await writeFile(path, newValue);
			  }
	);
}

/**
 * Gets the first value from a readable that matches the predicate.
 * @param predicate By default, returns the first non-nullish value.
 */
export function getAsync<T>(
	r: Readable<T>,
	predicate: (value: T) => any = (v) => !isNil(v)
): Promise<T> {
	return new Promise((resolve) => {
		let unsub = noop;
		unsub = r.subscribe((value) => {
			if (predicate(value)) {
				unsub();
				resolve(value);
			}
		});
	});
}

export function awaitStore<T>(store: Readable<T>): Readable<Awaited<T>>;
export function awaitStore<T>(store: Writable<T>): Writable<Awaited<T>>;
export function awaitStore<T>(
	store: Readable<T> | Writable<T>
): Readable<Awaited<T>> | Writable<Awaited<T>> {
	const result: Readable<Awaited<T>> & Partial<Writable<Awaited<T>>> = derived(
		store,
		($store, set) => {
			if ($store instanceof Promise) $store.then(set);
			else set($store as Awaited<T>);
		}
	);
	if ('set' in store) result.set = store.set;
	if ('update' in store) result.update = store.update as any;
	return result;
}

/** Returns a writable that calls `getter` only once to set it's value. */
export function fetchOnce<T>(initialValue: T | undefined, getter: () => Promise<T>): Writable<T> {
	const store = writable(initialValue);
	getter().then(store.set);
	return store;
}

export function preferenceStore<T>(key: string, initialValue: T): Writable<T> {
	let doneFetching = false;
	const { subscribe, update } = fetchOnce(initialValue, async () => {
		const result = (await preferences.get<T>(key)) ?? initialValue;
		doneFetching = true;
		return result;
	});

	return {
		subscribe,
		update: (fn: (value: T) => T) => {
			update((value) => {
				const newValue = fn(value);
				if (doneFetching) preferences.set(key, newValue);
				return newValue;
			});
		},
		set: (value: T) => {
			update(() => {
				if (doneFetching) preferences.set(key, value);
				return value;
			});
		}
	};
}

export function getNth<T>(n: number, store: Readable<T>) {
	let unsub = noop;
	return new Promise((resolve) => {
		unsub = store.subscribe((value) => {
			if (--n === 0) {
				unsub();
				resolve(value);
			}
		});
	});
}
