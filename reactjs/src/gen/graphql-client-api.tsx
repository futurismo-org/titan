import gql from 'graphql-tag';
import * as ReactApolloHooks from 'react-apollo-hooks';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Challenge = {
  __typename?: 'Challenge';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateChallenge: Challenge;
  deleteChallenge: Challenge;
};

export type MutationUpdateChallengeArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
};

export type MutationDeleteChallengeArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  challenges?: Maybe<Array<Challenge>>;
  challenge?: Maybe<Challenge>;
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
};

export type QueryChallengeArgs = {
  id: Scalars['ID'];
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};
export type ChallengeQueryVariables = {
  id: Scalars['ID'];
};

export type ChallengeQuery = { __typename?: 'Query' } & {
  challenge: Maybe<
    { __typename?: 'Challenge' } & Pick<
      Challenge,
      'id' | 'title' | 'description'
    >
  >;
};

export type ChallengesQueryVariables = {};

export type ChallengesQuery = { __typename?: 'Query' } & {
  challenges: Maybe<
    Array<
      { __typename?: 'Challenge' } & Pick<
        Challenge,
        'id' | 'title' | 'description'
      >
    >
  >;
};

export type CategoryQueryVariables = {
  id: Scalars['ID'];
};

export type CategoryQuery = { __typename?: 'Query' } & {
  category: Maybe<
    { __typename?: 'Category' } & Pick<Category, 'id' | 'title' | 'description'>
  >;
};

export type CategoriesQueryVariables = {};

export type CategoriesQuery = { __typename?: 'Query' } & {
  categories: Maybe<
    Array<
      { __typename?: 'Category' } & Pick<
        Category,
        'id' | 'title' | 'description'
      >
    >
  >;
};

export type DeleteChallengeMutationVariables = {
  id: Scalars['ID'];
};

export type DeleteChallengeMutation = { __typename?: 'Mutation' } & {
  deleteChallenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id'>;
};

export type UpdateChallengeMutationVariables = {
  title: Scalars['String'];
  description: Scalars['String'];
  overview: Scalars['String'];
  rules: Scalars['String'];
};

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
export const CategoryDocument = gql`
  query category($id: ID!) {
    category(id: $id) {
      id
      title
      description
    }
  }
`;

export function useCategoryQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CategoryQueryVariables>
) {
  return ReactApolloHooks.useQuery<CategoryQuery, CategoryQueryVariables>(
    CategoryDocument,
    baseOptions
  );
}
export const CategoriesDocument = gql`
  query categories {
    categories {
      id
      title
      description
    }
  }
`;

export function useCategoriesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CategoriesQueryVariables>
) {
  return ReactApolloHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
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
