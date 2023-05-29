import type { BaseModel } from 'pocketbase';

export type PBBaseModel = Pick<BaseModel, 'id' | 'created' | 'updated'>;

export interface CollectionRecord {
	collectionId: string;
	collectionName: string;
}
export interface User extends PBBaseModel, CollectionRecord {
	avatar: string;
	email: string;
	emailVisibility: boolean;
	name: string;
	username: string;
	verified: boolean;
}

export interface Family extends PBBaseModel, CollectionRecord {
	name: string;
	recipes: any[];
	users: string[];
	expand: {};
}
