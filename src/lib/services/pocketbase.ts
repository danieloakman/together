import PocketBase from 'pocketbase';
import type { BaseModel } from 'pocketbase';
import env from '$utils/env';

export const pb = new PocketBase(env.POCKETBASE_URL);
export default pb;

export type PBBaseModel = Pick<BaseModel, 'id' | 'created' | 'updated'>;

export interface CollectionRecord {
  collectionId: string;
  collectionName: string;
}

export function fileUrl(collectionId: string, id: string, filename: string) {
  return `${env.POCKETBASE_URL}/api/files/${collectionId}/${id}/${filename}`;
}