import { pb, fileUrl } from './pocketbase';
import type { PBBaseModel, CollectionRecord } from './pocketbase';
import { writable, derived } from 'svelte/store';

export interface User extends PBBaseModel, CollectionRecord {
  avatar: string;
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
}

/** If null then is not auth'd. */
export const currentUser = writable(pb.authStore.model as User | null);
export const currentUserAvatar = derived(currentUser, $u => {
  if (!$u?.avatar) return 'default-avatar.png';
  return fileUrl($u.collectionId, $u.id, $u.avatar);
});
    
currentUser.subscribe(user => {
  console.log('currentUser.subscribe', user);
});

pb.authStore.onChange(auth => {
  console.log('pb.authStore.onChange', auth);
  currentUser.set(pb.authStore.model as User | null);
});

export function logout() {
  pb.authStore.clear();
}

export async function login(usernameOrEmail: string, password: string) {
  return pb.collection('users').authWithPassword(usernameOrEmail, password);
}

// export function loginWithProvider(provider: 'google' | 'apple') {
//   return pb.collection('users').authWithOAuth2({ provider });
// }
