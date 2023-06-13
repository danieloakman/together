import { goto } from '$app/navigation';
import { drawerStore } from '@skeletonlabs/skeleton';
import { pb, fileUrl } from './pocketbase';
import type { User } from '$types';
import { writable, derived, type Readable } from 'svelte/store';

/** Internal auth store. */
const store = writable(pb.authStore.model as User | null);

/** If null then is not auth'd. */
export const currentUser: Readable<User | null> = { subscribe: store.subscribe };

export const currentUserAvatar = derived(store, ($u) => {
	if (!$u?.avatar) return 'default-avatar.png';
	return fileUrl($u.collectionId, $u.id, $u.avatar);
});

pb.authStore.onChange((auth) => {
	store.set(pb.authStore.model as User | null);
	console.log('authStore:', pb.authStore.model);
}, true);

export function logout() {
	pb.authStore.clear();
	goto('/');
	drawerStore.close();
}

export async function login(usernameOrEmail: string, password: string) {
	return pb.collection('users').authWithPassword(usernameOrEmail.toLowerCase(), password, {});
}

// export function loginWithProvider(provider: 'google' | 'apple') {
//   return pb.collection('users').authWithOAuth2({ provider });
// }
