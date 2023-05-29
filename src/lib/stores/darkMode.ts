import { getAsync, getNth, preferenceStore } from '$utils';
import { get } from 'svelte/store';

const store = preferenceStore('dark', true);

/** '' is for light mode, i.e. turning dark mode off. */
function swapMode(mode?: 'dark' | '') {
	const el = document.getElementsByTagName('html')[0];
	if (typeof mode === 'string') el.className = mode;
	else el.className = el.className === 'dark' ? '' : 'dark';
}

store.subscribe((dark) => {
	swapMode(dark ? 'dark' : '');
});

export const darkMode = {
	on: () => store.set(true),
	off: () => store.set(false),
	toggle: () => store.update((dark) => !dark),
	subscribe: store.subscribe
};
