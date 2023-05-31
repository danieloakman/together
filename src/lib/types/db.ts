import type { BaseModel } from 'pocketbase';

export type PBBaseModel = Pick<BaseModel, 'id' | 'created' | 'updated'>;

export interface CollectionRecord {
	collectionId: string;
	collectionName: string;
}

export type Expands<Name extends string, T> = Record<Name, string> & {
	expand: Record<Name, T | undefined>;
};

export type Updateable<T extends Record<PropertyKey, any>> = Partial<
	Omit<T, keyof PBBaseModel | 'expand' | keyof CollectionRecord>
>;

export interface User extends PBBaseModel, CollectionRecord, Expands<'family', Family> {
	avatar: string;
	email: string;
	emailVisibility: boolean;
	name: string;
	username: string;
	verified: boolean;
}

export interface Family extends PBBaseModel, CollectionRecord {
	name: string;
	recipes: string[];
}
