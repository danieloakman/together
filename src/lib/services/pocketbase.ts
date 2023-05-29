import PocketBase from 'pocketbase';
import type { BaseModel } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
export default pb;

export function fileUrl(collectionId: string, id: string, filename: string) {
	return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${id}/${filename}`;
}
