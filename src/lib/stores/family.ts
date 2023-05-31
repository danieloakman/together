import { pb, currentUser, reloadable, awaitStore, iife } from '$lib';
import type { Family, Updateable } from '$types';
import { derived, writable } from 'svelte/store';

// export const family = pb.collection('families').getOne('', {  });
// export const family = derived(currentUser, ($u) => {
// 	if (!$u) return null;
// 	return pb.collection('families').getFirstListItem<Family>(`id="${$u.family}"`);
// });
// const { subscribe, reload } = iife(() => {
const { subscribe, reload, update } = reloadable([currentUser], async ([$u]) => {
	if (!$u) return null;
	return pb.collection('families').getFirstListItem<Family>(`id="${$u.family}"`);
});
// 	return Object.assign(awaitStore({ subscribe }), { reload });
// });

const wrappedUpdate = (fn: (value: Family | null) => Updateable<Family>) => {
	update((oldValue) => {
		if (!oldValue) return null;
		const newValue = fn(oldValue);
		pb.collection('families').update<Family>(oldValue.id, newValue);
		return Object.assign({}, oldValue, newValue);
	});
};

export const family = {
	subscribe,
	reload,
	set: (value: Updateable<Family>) => wrappedUpdate(() => value),
	update: wrappedUpdate
};

subscribe((f) => console.log('family:', f));

export const familyMembers = derived({ subscribe }, (f, set) => {
	// f.then();
});

// family.subscribe(async f => console.log('family:', await f));

// function a() {
//   pb.collection('family').update<Family>('id', {  }, {  });
// }
