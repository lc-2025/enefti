/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type INft = {
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateNfts?: Maybe<Array<Maybe<Nft>>>;
};


export type MutationUpdateNftsArgs = {
  ids: Array<Scalars['ID']['input']>;
  owner: Scalars['String']['input'];
};

export type Nft = INft & {
  __typename?: 'Nft';
  count?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  nft?: Maybe<Nft>;
  nfts?: Maybe<Array<Maybe<Nft>>>;
};


export type QueryNftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNftsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type NftFragmentIdFragment = { __typename?: 'Nft', id?: string | null } & { ' $fragmentName'?: 'NftFragmentIdFragment' };

export type NftFragmentPropsFragment = { __typename?: 'Nft', name: string, image?: string | null, description?: string | null, price?: number | null, owner?: string | null, count?: number | null } & { ' $fragmentName'?: 'NftFragmentPropsFragment' };

export type NftsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NftsQuery = { __typename?: 'Query', nfts?: Array<(
    { __typename?: 'Nft' }
    & { ' $fragmentRefs'?: { 'NftFragmentIdFragment': NftFragmentIdFragment;'NftFragmentPropsFragment': NftFragmentPropsFragment } }
  ) | null> | null };

export type UpdateNftsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  owner: Scalars['String']['input'];
}>;


export type UpdateNftsMutation = { __typename?: 'Mutation', updateNfts?: Array<(
    { __typename?: 'Nft' }
    & { ' $fragmentRefs'?: { 'NftFragmentIdFragment': NftFragmentIdFragment;'NftFragmentPropsFragment': NftFragmentPropsFragment } }
  ) | null> | null };

export type NftQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: (
    { __typename?: 'Nft' }
    & { ' $fragmentRefs'?: { 'NftFragmentIdFragment': NftFragmentIdFragment;'NftFragmentPropsFragment': NftFragmentPropsFragment } }
  ) | null };

export const NftFragmentIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<NftFragmentIdFragment, unknown>;
export const NftFragmentPropsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentProps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<NftFragmentPropsFragment, unknown>;
export const NftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nfts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentProps"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentProps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<NftsQuery, NftsQueryVariables>;
export const UpdateNftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNfts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentProps"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentProps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<UpdateNftsMutation, UpdateNftsMutationVariables>;
export const NftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Nft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NftFragmentProps"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NftFragmentProps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<NftQuery, NftQueryVariables>;