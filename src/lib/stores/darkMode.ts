import { writable } from "svelte/store";

const { subscribe, set } = writable(true);

/** '' is for light mode, i.e. turning dark mode off. */
function swapMode(mode?: 'dark' | '') {
  const el = document.getElementsByTagName('html')[0];
  if (typeof mode === 'string')
    el.className = mode;
  else 
    el.className = el.className === 'dark' ? '' : 'dark';
  set(el.className === 'dark');
}

export const darkMode = {
  on: () => swapMode('dark'),
  off: () => swapMode(''),
  toggle: () => swapMode(),
  subscribe
};
