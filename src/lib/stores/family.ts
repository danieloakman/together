import { pb, currentUser } from '$lib';
import type { Family } from '$types';
import { derived } from 'svelte/store';

// export const family = pb.collection('families').getOne('', {  });
export const family = derived(currentUser, ($u) => {
  if (!$u) return null;
	return pb.collection('families').getFirstListItem<Family>(`users.id="${$u.id}"`)
}
);
family.subscribe(async f => console.log('family:', await f));