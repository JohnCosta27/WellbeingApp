import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BrandWords = {
  __typename?: 'BrandWords';
  word: Scalars['String'];
};

export type MentalEnergy = {
  __typename?: 'MentalEnergy';
  date: Scalars['Float'];
  level: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHowAmIWords?: Maybe<Scalars['String']>;
  addMentalEnergy?: Maybe<MentalEnergy>;
};


export type MutationAddHowAmIWordsArgs = {
  word: Scalars['String'];
};


export type MutationAddMentalEnergyArgs = {
  level: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  howAmIWords: Array<Scalars['String']>;
  mentalEnergy: Array<MentalEnergy>;
};

export type User = {
  __typename?: 'User';
  brand: UserBrand;
  howAmIWords: Array<Scalars['String']>;
  mentalEnergy: Array<MentalEnergy>;
};

export type UserBrand = {
  __typename?: 'UserBrand';
  words: Array<BrandWords>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BrandWords: ResolverTypeWrapper<BrandWords>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MentalEnergy: ResolverTypeWrapper<MentalEnergy>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserBrand: ResolverTypeWrapper<UserBrand>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  BrandWords: BrandWords;
  Float: Scalars['Float'];
  MentalEnergy: MentalEnergy;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: User;
  UserBrand: UserBrand;
};

export type BrandWordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrandWords'] = ResolversParentTypes['BrandWords']> = {
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MentalEnergyResolvers<ContextType = any, ParentType extends ResolversParentTypes['MentalEnergy'] = ResolversParentTypes['MentalEnergy']> = {
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addHowAmIWords?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationAddHowAmIWordsArgs, 'word'>>;
  addMentalEnergy?: Resolver<Maybe<ResolversTypes['MentalEnergy']>, ParentType, ContextType, RequireFields<MutationAddMentalEnergyArgs, 'level'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  howAmIWords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  mentalEnergy?: Resolver<Array<ResolversTypes['MentalEnergy']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  brand?: Resolver<ResolversTypes['UserBrand'], ParentType, ContextType>;
  howAmIWords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  mentalEnergy?: Resolver<Array<ResolversTypes['MentalEnergy']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBrand'] = ResolversParentTypes['UserBrand']> = {
  words?: Resolver<Array<ResolversTypes['BrandWords']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BrandWords?: BrandWordsResolvers<ContextType>;
  MentalEnergy?: MentalEnergyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBrand?: UserBrandResolvers<ContextType>;
};


export type AddMentalEnergyMutationVariables = Exact<{
  level: Scalars['Float'];
}>;


export type AddMentalEnergyMutation = { __typename?: 'Mutation', addMentalEnergy?: { __typename?: 'MentalEnergy', level: number, date: number } | null };

export type MentalEnergyQueryVariables = Exact<{ [key: string]: never; }>;


export type MentalEnergyQuery = { __typename?: 'Query', mentalEnergy: Array<{ __typename?: 'MentalEnergy', date: number, level: number }> };


export const AddMentalEnergyDocument = gql`
    mutation addMentalEnergy($level: Float!) {
  addMentalEnergy(level: $level) {
    level
    date
  }
}
    `;
export type AddMentalEnergyMutationFn = Apollo.MutationFunction<AddMentalEnergyMutation, AddMentalEnergyMutationVariables>;

/**
 * __useAddMentalEnergyMutation__
 *
 * To run a mutation, you first call `useAddMentalEnergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMentalEnergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMentalEnergyMutation, { data, loading, error }] = useAddMentalEnergyMutation({
 *   variables: {
 *      level: // value for 'level'
 *   },
 * });
 */
export function useAddMentalEnergyMutation(baseOptions?: Apollo.MutationHookOptions<AddMentalEnergyMutation, AddMentalEnergyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMentalEnergyMutation, AddMentalEnergyMutationVariables>(AddMentalEnergyDocument, options);
      }
export type AddMentalEnergyMutationHookResult = ReturnType<typeof useAddMentalEnergyMutation>;
export type AddMentalEnergyMutationResult = Apollo.MutationResult<AddMentalEnergyMutation>;
export type AddMentalEnergyMutationOptions = Apollo.BaseMutationOptions<AddMentalEnergyMutation, AddMentalEnergyMutationVariables>;
export const MentalEnergyDocument = gql`
    query mentalEnergy {
  mentalEnergy {
    date
    level
  }
}
    `;

/**
 * __useMentalEnergyQuery__
 *
 * To run a query within a React component, call `useMentalEnergyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentalEnergyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentalEnergyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMentalEnergyQuery(baseOptions?: Apollo.QueryHookOptions<MentalEnergyQuery, MentalEnergyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MentalEnergyQuery, MentalEnergyQueryVariables>(MentalEnergyDocument, options);
      }
export function useMentalEnergyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentalEnergyQuery, MentalEnergyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MentalEnergyQuery, MentalEnergyQueryVariables>(MentalEnergyDocument, options);
        }
export type MentalEnergyQueryHookResult = ReturnType<typeof useMentalEnergyQuery>;
export type MentalEnergyLazyQueryHookResult = ReturnType<typeof useMentalEnergyLazyQuery>;
export type MentalEnergyQueryResult = Apollo.QueryResult<MentalEnergyQuery, MentalEnergyQueryVariables>;
export const namedOperations = {
  Query: {
    mentalEnergy: 'mentalEnergy'
  },
  Mutation: {
    addMentalEnergy: 'addMentalEnergy'
  }
}