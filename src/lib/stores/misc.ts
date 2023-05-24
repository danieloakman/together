import { page } from '$app/stores';
import { drawerStore } from '@skeletonlabs/skeleton';
import { derived } from 'svelte/store';

/** Whether or not the Skeleton UI drawer is open. */
export const isDrawerOpen = derived(drawerStore, ($drawer) => $drawer.open ?? false);

/** E.g. ['users', '[id]', 'data'] */
export const routes = derived(page, ($page) => $page.route.id?.split('/').filter(Boolean) ?? []);
