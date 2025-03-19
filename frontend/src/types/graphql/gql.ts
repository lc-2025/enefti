/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment NftFragmentId on Nft {\n      id\n    }\n  ": typeof types.NftFragmentIdFragmentDoc,
    "\n    fragment NftFragmentProps on Nft {\n      name\n      image\n      description\n      price\n      owner\n    }\n  ": typeof types.NftFragmentPropsFragmentDoc,
    "\n      query Nfts($search: String, $offset: Int, $limit: Int) {\n        nfts(search: $search, offset: $offset, limit: $limit) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    ": typeof types.NftsDocument,
    "\n      query Nft($id: ID!) {\n        nft(id: $id) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    ": typeof types.NftDocument,
};
const documents: Documents = {
    "\n    fragment NftFragmentId on Nft {\n      id\n    }\n  ": types.NftFragmentIdFragmentDoc,
    "\n    fragment NftFragmentProps on Nft {\n      name\n      image\n      description\n      price\n      owner\n    }\n  ": types.NftFragmentPropsFragmentDoc,
    "\n      query Nfts($search: String, $offset: Int, $limit: Int) {\n        nfts(search: $search, offset: $offset, limit: $limit) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    ": types.NftsDocument,
    "\n      query Nft($id: ID!) {\n        nft(id: $id) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    ": types.NftDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment NftFragmentId on Nft {\n      id\n    }\n  "): (typeof documents)["\n    fragment NftFragmentId on Nft {\n      id\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment NftFragmentProps on Nft {\n      name\n      image\n      description\n      price\n      owner\n    }\n  "): (typeof documents)["\n    fragment NftFragmentProps on Nft {\n      name\n      image\n      description\n      price\n      owner\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query Nfts($search: String, $offset: Int, $limit: Int) {\n        nfts(search: $search, offset: $offset, limit: $limit) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    "): (typeof documents)["\n      query Nfts($search: String, $offset: Int, $limit: Int) {\n        nfts(search: $search, offset: $offset, limit: $limit) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query Nft($id: ID!) {\n        nft(id: $id) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    "): (typeof documents)["\n      query Nft($id: ID!) {\n        nft(id: $id) {\n          ...NftFragmentId\n          ...NftFragmentProps\n        }\n      }\n    "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;