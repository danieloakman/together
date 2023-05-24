import { preferenceStore } from "$utils";
import { get } from "svelte/store";

// TODO: 
const store = preferenceStore('dark', true);

/** '' is for light mode, i.e. turning dark mode off. */
function swapMode(mode?: 'dark' | '') {
  const el = document.getElementsByTagName('html')[0];
  if (typeof mode === 'string')
    el.className = mode;
  else 
    el.className = el.className === 'dark' ? '' : 'dark';
  store.set(el.className === 'dark');
}
get(store).then(v => swapMode(v ? 'dark' : ''));

export const darkMode = {
  on: () => swapMode('dark'),
  off: () => swapMode(''),
  toggle: () => swapMode(),
  subscribe: store.subscribe,
};
