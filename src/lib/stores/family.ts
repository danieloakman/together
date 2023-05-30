import { pb, currentUser, reloadable } from '$lib';
import type { Family } from '$types';
import { derived } from 'svelte/store';

// export const family = pb.collection('families').getOne('', {  });
// export const family = derived(currentUser, ($u) => {
// 	if (!$u) return null;
// 	return pb.collection('families').getFirstListItem<Family>(`id="${$u.family}"`);
// });
export const family = reloadable([currentUser], async ([$u]) => {
  if (!$u) return null;
  return pb.collection('families').getFirstListItem<Family>(`id="${$u.family}"`);
});

export const familyMembers = derived(family, async () => {

});
// family.subscribe(async f => console.log('family:', await f));

// function a() {
//   pb.collection('family').update<Family>('id', {  }, {  });
// }
