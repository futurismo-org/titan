import gql from 'graphql-tag';
import * as ReactApolloHooks from 'react-apollo-hooks';
import * as ReactApollo from 'react-apollo';

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Challenge {
  __typename?: 'Challenge';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  updateChallenge: Challenge;
  deleteChallenge: Challenge;
}

export interface MutationUpdateChallengeArgs {
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
}

export interface MutationDeleteChallengeArgs {
  id: Scalars['ID'];
}

export interface Query {
  __typename?: 'Query';
  challenges?: Maybe<Maybe<Challenge>[]>;
  challenge?: Maybe<Challenge>;
}

export interface QueryChallengeArgs {
  id: Scalars['ID'];
}
export interface ChallengeQueryVariables {
  id: Scalars['ID'];
}

export type ChallengeQuery = { __typename?: 'Query' } & {
  challenge: Maybe<
    { __typename?: 'Challenge' } & Pick<
      Challenge,
      'id' | 'title' | 'description'
    >
  >;
};

export interface ChallengesQueryVariables {}

export type ChallengesQuery = { __typename?: 'Query' } & {
  challenges: Maybe<
    Maybe<
      { __typename?: 'Challenge' } & Pick<
        Challenge,
        'id' | 'title' | 'description'
      >
    >[]
  >;
};

export interface DeleteChallengeMutationVariables {
  id: Scalars['ID'];
}

export type DeleteChallengeMutation = { __typename?: 'Mutation' } & {
  deleteChallenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id'>;
};

export interface UpdateChallengeMutationVariables {
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
}

export type UpdateChallengeMutation = { __typename?: 'Mutation' } & {
  updateChallenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id'>;
};

export const ChallengeDocument = gql`
  query challenge($id: ID!) {
    challenge(id: $id) {
      id
      title
      description
    }
  }
`;

export function useChallengeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ChallengeQueryVariables>
) {
  return ReactApolloHooks.useQuery<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    baseOptions
  );
}
export const ChallengesDocument = gql`
  query challenges {
    challenges {
      id
      title
      description
    }
  }
`;

export function useChallengesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ChallengesQueryVariables>
) {
  return ReactApolloHooks.useQuery<ChallengesQuery, ChallengesQueryVariables>(
    ChallengesDocument,
    baseOptions
  );
}
export const DeleteChallengeDocument = gql`
  mutation deleteChallenge($id: ID!) {
    deleteChallenge(id: $id) {
      id
    }
  }
`;
export type DeleteChallengeMutationFn = ReactApollo.MutationFn<
  DeleteChallengeMutation,
  DeleteChallengeMutationVariables
>;

export function useDeleteChallengeMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables
  >(DeleteChallengeDocument, baseOptions);
}
export const UpdateChallengeDocument = gql`
  mutation updateChallenge(
    $title: String!
    $description: String!
    $overview: String!
    $rules: String!
  ) {
    updateChallenge(
      title: $title
      description: $description
      overview: $overview
      rules: $rules
    ) {
      id
    }
  }
`;
export type UpdateChallengeMutationFn = ReactApollo.MutationFn<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>;

export function useUpdateChallengeMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >(UpdateChallengeDocument, baseOptions);
}
