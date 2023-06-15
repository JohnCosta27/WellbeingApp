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

export type Assignments = {
  __typename?: 'Assignments';
  date: Scalars['Float'];
  name: Scalars['String'];
  score: Scalars['Float'];
};

export type BrandWords = {
  __typename?: 'BrandWords';
  id: Scalars['String'];
  word: Scalars['String'];
};

export type HowAmIPhrase = {
  __typename?: 'HowAmIPhrase';
  date?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  phrase: Scalars['String'];
};

export type MentalEnergy = {
  __typename?: 'MentalEnergy';
  date: Scalars['Float'];
  level: Scalars['Float'];
};

export type Module = {
  __typename?: 'Module';
  id: Scalars['String'];
  name: Scalars['String'];
  year: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssignment?: Maybe<Scalars['Boolean']>;
  addBrandWord?: Maybe<Scalars['Boolean']>;
  addHowAmIPhrase?: Maybe<Scalars['Boolean']>;
  addMentalEnergy?: Maybe<MentalEnergy>;
  addModule?: Maybe<Scalars['Boolean']>;
  addWholeBrand?: Maybe<Scalars['Boolean']>;
};


export type MutationAddAssignmentArgs = {
  moduleId: Scalars['String'];
  name: Scalars['String'];
  score: Scalars['Float'];
};


export type MutationAddBrandWordArgs = {
  wordId: Scalars['String'];
};


export type MutationAddHowAmIPhraseArgs = {
  id: Scalars['String'];
};


export type MutationAddMentalEnergyArgs = {
  level: Scalars['Float'];
};


export type MutationAddModuleArgs = {
  moduleId: Scalars['String'];
};

export type PastUserBrand = {
  __typename?: 'PastUserBrand';
  date?: Maybe<Scalars['Float']>;
  words: Array<BrandWords>;
};

export type Query = {
  __typename?: 'Query';
  brandWords: Array<BrandWords>;
  currentUser: User;
  howAmIPhrase: Array<HowAmIPhrase>;
  mentalEnergy: Array<MentalEnergy>;
  modules: Array<Module>;
};

export type User = {
  __typename?: 'User';
  brand: UserBrand;
  howAmIPhrase: Array<UserHowAmIPhrase>;
  mentalEnergy: Array<MentalEnergy>;
  modules: Array<UserModules>;
};

export type UserBrand = {
  __typename?: 'UserBrand';
  pastBrand: Array<PastUserBrand>;
  words: Array<BrandWords>;
};

export type UserHowAmIPhrase = {
  __typename?: 'UserHowAmIPhrase';
  date: Scalars['Float'];
  phrase: HowAmIPhrase;
};

export type UserModules = {
  __typename?: 'UserModules';
  assignments: Array<Assignments>;
  module: Module;
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
  Assignments: ResolverTypeWrapper<Assignments>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BrandWords: ResolverTypeWrapper<BrandWords>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  HowAmIPhrase: ResolverTypeWrapper<HowAmIPhrase>;
  MentalEnergy: ResolverTypeWrapper<MentalEnergy>;
  Module: ResolverTypeWrapper<Module>;
  Mutation: ResolverTypeWrapper<{}>;
  PastUserBrand: ResolverTypeWrapper<PastUserBrand>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserBrand: ResolverTypeWrapper<UserBrand>;
  UserHowAmIPhrase: ResolverTypeWrapper<UserHowAmIPhrase>;
  UserModules: ResolverTypeWrapper<UserModules>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Assignments: Assignments;
  Boolean: Scalars['Boolean'];
  BrandWords: BrandWords;
  Float: Scalars['Float'];
  HowAmIPhrase: HowAmIPhrase;
  MentalEnergy: MentalEnergy;
  Module: Module;
  Mutation: {};
  PastUserBrand: PastUserBrand;
  Query: {};
  String: Scalars['String'];
  User: User;
  UserBrand: UserBrand;
  UserHowAmIPhrase: UserHowAmIPhrase;
  UserModules: UserModules;
};

export type AssignmentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Assignments'] = ResolversParentTypes['Assignments']> = {
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandWordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrandWords'] = ResolversParentTypes['BrandWords']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HowAmIPhraseResolvers<ContextType = any, ParentType extends ResolversParentTypes['HowAmIPhrase'] = ResolversParentTypes['HowAmIPhrase']> = {
  date?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MentalEnergyResolvers<ContextType = any, ParentType extends ResolversParentTypes['MentalEnergy'] = ResolversParentTypes['MentalEnergy']> = {
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Module'] = ResolversParentTypes['Module']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAssignment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddAssignmentArgs, 'moduleId' | 'name' | 'score'>>;
  addBrandWord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddBrandWordArgs, 'wordId'>>;
  addHowAmIPhrase?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddHowAmIPhraseArgs, 'id'>>;
  addMentalEnergy?: Resolver<Maybe<ResolversTypes['MentalEnergy']>, ParentType, ContextType, RequireFields<MutationAddMentalEnergyArgs, 'level'>>;
  addModule?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddModuleArgs, 'moduleId'>>;
  addWholeBrand?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type PastUserBrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['PastUserBrand'] = ResolversParentTypes['PastUserBrand']> = {
  date?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  words?: Resolver<Array<ResolversTypes['BrandWords']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  brandWords?: Resolver<Array<ResolversTypes['BrandWords']>, ParentType, ContextType>;
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  howAmIPhrase?: Resolver<Array<ResolversTypes['HowAmIPhrase']>, ParentType, ContextType>;
  mentalEnergy?: Resolver<Array<ResolversTypes['MentalEnergy']>, ParentType, ContextType>;
  modules?: Resolver<Array<ResolversTypes['Module']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  brand?: Resolver<ResolversTypes['UserBrand'], ParentType, ContextType>;
  howAmIPhrase?: Resolver<Array<ResolversTypes['UserHowAmIPhrase']>, ParentType, ContextType>;
  mentalEnergy?: Resolver<Array<ResolversTypes['MentalEnergy']>, ParentType, ContextType>;
  modules?: Resolver<Array<ResolversTypes['UserModules']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBrand'] = ResolversParentTypes['UserBrand']> = {
  pastBrand?: Resolver<Array<ResolversTypes['PastUserBrand']>, ParentType, ContextType>;
  words?: Resolver<Array<ResolversTypes['BrandWords']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserHowAmIPhraseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserHowAmIPhrase'] = ResolversParentTypes['UserHowAmIPhrase']> = {
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['HowAmIPhrase'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModulesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModules'] = ResolversParentTypes['UserModules']> = {
  assignments?: Resolver<Array<ResolversTypes['Assignments']>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes['Module'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Assignments?: AssignmentsResolvers<ContextType>;
  BrandWords?: BrandWordsResolvers<ContextType>;
  HowAmIPhrase?: HowAmIPhraseResolvers<ContextType>;
  MentalEnergy?: MentalEnergyResolvers<ContextType>;
  Module?: ModuleResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PastUserBrand?: PastUserBrandResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBrand?: UserBrandResolvers<ContextType>;
  UserHowAmIPhrase?: UserHowAmIPhraseResolvers<ContextType>;
  UserModules?: UserModulesResolvers<ContextType>;
};


export type AddMentalEnergyMutationVariables = Exact<{
  level: Scalars['Float'];
}>;


export type AddMentalEnergyMutation = { __typename?: 'Mutation', addMentalEnergy?: { __typename?: 'MentalEnergy', level: number, date: number } | null };

export type AddHowAmIPhraseMutationVariables = Exact<{
  addHowAmIPhraseId: Scalars['String'];
}>;


export type AddHowAmIPhraseMutation = { __typename?: 'Mutation', addHowAmIPhrase?: boolean | null };

export type AddBrandWordMutationVariables = Exact<{
  addBrandWord: Scalars['String'];
}>;


export type AddBrandWordMutation = { __typename?: 'Mutation', addBrandWord?: boolean | null };

export type AddWholeBrandMutationVariables = Exact<{ [key: string]: never; }>;


export type AddWholeBrandMutation = { __typename?: 'Mutation', addWholeBrand?: boolean | null };

export type AddModuleMutationVariables = Exact<{
  moduleId: Scalars['String'];
}>;


export type AddModuleMutation = { __typename?: 'Mutation', addModule?: boolean | null };

export type AddAssignmentMutationVariables = Exact<{
  moduleId: Scalars['String'];
  name: Scalars['String'];
  score: Scalars['Float'];
}>;


export type AddAssignmentMutation = { __typename?: 'Mutation', addAssignment?: boolean | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', howAmIPhrase: Array<{ __typename?: 'UserHowAmIPhrase', date: number, phrase: { __typename?: 'HowAmIPhrase', id: string, phrase: string } }>, mentalEnergy: Array<{ __typename?: 'MentalEnergy', date: number, level: number }>, brand: { __typename?: 'UserBrand', words: Array<{ __typename?: 'BrandWords', id: string, word: string }>, pastBrand: Array<{ __typename?: 'PastUserBrand', date?: number | null, words: Array<{ __typename?: 'BrandWords', id: string, word: string }> }> }, modules: Array<{ __typename?: 'UserModules', module: { __typename?: 'Module', id: string, name: string, year: string }, assignments: Array<{ __typename?: 'Assignments', name: string, date: number, score: number }> }> } };

export type HowAmIPhraseQueryVariables = Exact<{ [key: string]: never; }>;


export type HowAmIPhraseQuery = { __typename?: 'Query', howAmIPhrase: Array<{ __typename?: 'HowAmIPhrase', phrase: string, id: string }> };

export type BrandWordsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandWordsQuery = { __typename?: 'Query', brandWords: Array<{ __typename?: 'BrandWords', id: string, word: string }> };

export type ModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type ModulesQuery = { __typename?: 'Query', modules: Array<{ __typename?: 'Module', id: string, name: string, year: string }> };


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
export const AddHowAmIPhraseDocument = gql`
    mutation addHowAmIPhrase($addHowAmIPhraseId: String!) {
  addHowAmIPhrase(id: $addHowAmIPhraseId)
}
    `;
export type AddHowAmIPhraseMutationFn = Apollo.MutationFunction<AddHowAmIPhraseMutation, AddHowAmIPhraseMutationVariables>;

/**
 * __useAddHowAmIPhraseMutation__
 *
 * To run a mutation, you first call `useAddHowAmIPhraseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHowAmIPhraseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHowAmIPhraseMutation, { data, loading, error }] = useAddHowAmIPhraseMutation({
 *   variables: {
 *      addHowAmIPhraseId: // value for 'addHowAmIPhraseId'
 *   },
 * });
 */
export function useAddHowAmIPhraseMutation(baseOptions?: Apollo.MutationHookOptions<AddHowAmIPhraseMutation, AddHowAmIPhraseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHowAmIPhraseMutation, AddHowAmIPhraseMutationVariables>(AddHowAmIPhraseDocument, options);
      }
export type AddHowAmIPhraseMutationHookResult = ReturnType<typeof useAddHowAmIPhraseMutation>;
export type AddHowAmIPhraseMutationResult = Apollo.MutationResult<AddHowAmIPhraseMutation>;
export type AddHowAmIPhraseMutationOptions = Apollo.BaseMutationOptions<AddHowAmIPhraseMutation, AddHowAmIPhraseMutationVariables>;
export const AddBrandWordDocument = gql`
    mutation addBrandWord($addBrandWord: String!) {
  addBrandWord(wordId: $addBrandWord)
}
    `;
export type AddBrandWordMutationFn = Apollo.MutationFunction<AddBrandWordMutation, AddBrandWordMutationVariables>;

/**
 * __useAddBrandWordMutation__
 *
 * To run a mutation, you first call `useAddBrandWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBrandWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBrandWordMutation, { data, loading, error }] = useAddBrandWordMutation({
 *   variables: {
 *      addBrandWord: // value for 'addBrandWord'
 *   },
 * });
 */
export function useAddBrandWordMutation(baseOptions?: Apollo.MutationHookOptions<AddBrandWordMutation, AddBrandWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBrandWordMutation, AddBrandWordMutationVariables>(AddBrandWordDocument, options);
      }
export type AddBrandWordMutationHookResult = ReturnType<typeof useAddBrandWordMutation>;
export type AddBrandWordMutationResult = Apollo.MutationResult<AddBrandWordMutation>;
export type AddBrandWordMutationOptions = Apollo.BaseMutationOptions<AddBrandWordMutation, AddBrandWordMutationVariables>;
export const AddWholeBrandDocument = gql`
    mutation addWholeBrand {
  addWholeBrand
}
    `;
export type AddWholeBrandMutationFn = Apollo.MutationFunction<AddWholeBrandMutation, AddWholeBrandMutationVariables>;

/**
 * __useAddWholeBrandMutation__
 *
 * To run a mutation, you first call `useAddWholeBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWholeBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWholeBrandMutation, { data, loading, error }] = useAddWholeBrandMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddWholeBrandMutation(baseOptions?: Apollo.MutationHookOptions<AddWholeBrandMutation, AddWholeBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWholeBrandMutation, AddWholeBrandMutationVariables>(AddWholeBrandDocument, options);
      }
export type AddWholeBrandMutationHookResult = ReturnType<typeof useAddWholeBrandMutation>;
export type AddWholeBrandMutationResult = Apollo.MutationResult<AddWholeBrandMutation>;
export type AddWholeBrandMutationOptions = Apollo.BaseMutationOptions<AddWholeBrandMutation, AddWholeBrandMutationVariables>;
export const AddModuleDocument = gql`
    mutation addModule($moduleId: String!) {
  addModule(moduleId: $moduleId)
}
    `;
export type AddModuleMutationFn = Apollo.MutationFunction<AddModuleMutation, AddModuleMutationVariables>;

/**
 * __useAddModuleMutation__
 *
 * To run a mutation, you first call `useAddModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addModuleMutation, { data, loading, error }] = useAddModuleMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useAddModuleMutation(baseOptions?: Apollo.MutationHookOptions<AddModuleMutation, AddModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddModuleMutation, AddModuleMutationVariables>(AddModuleDocument, options);
      }
export type AddModuleMutationHookResult = ReturnType<typeof useAddModuleMutation>;
export type AddModuleMutationResult = Apollo.MutationResult<AddModuleMutation>;
export type AddModuleMutationOptions = Apollo.BaseMutationOptions<AddModuleMutation, AddModuleMutationVariables>;
export const AddAssignmentDocument = gql`
    mutation addAssignment($moduleId: String!, $name: String!, $score: Float!) {
  addAssignment(moduleId: $moduleId, name: $name, score: $score)
}
    `;
export type AddAssignmentMutationFn = Apollo.MutationFunction<AddAssignmentMutation, AddAssignmentMutationVariables>;

/**
 * __useAddAssignmentMutation__
 *
 * To run a mutation, you first call `useAddAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssignmentMutation, { data, loading, error }] = useAddAssignmentMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *      name: // value for 'name'
 *      score: // value for 'score'
 *   },
 * });
 */
export function useAddAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<AddAssignmentMutation, AddAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAssignmentMutation, AddAssignmentMutationVariables>(AddAssignmentDocument, options);
      }
export type AddAssignmentMutationHookResult = ReturnType<typeof useAddAssignmentMutation>;
export type AddAssignmentMutationResult = Apollo.MutationResult<AddAssignmentMutation>;
export type AddAssignmentMutationOptions = Apollo.BaseMutationOptions<AddAssignmentMutation, AddAssignmentMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    howAmIPhrase {
      phrase {
        id
        phrase
      }
      date
    }
    mentalEnergy {
      date
      level
    }
    brand {
      words {
        id
        word
      }
      pastBrand {
        words {
          id
          word
        }
        date
      }
    }
    modules {
      module {
        id
        name
        year
      }
      assignments {
        name
        date
        score
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const HowAmIPhraseDocument = gql`
    query HowAmIPhrase {
  howAmIPhrase {
    phrase
    id
  }
}
    `;

/**
 * __useHowAmIPhraseQuery__
 *
 * To run a query within a React component, call `useHowAmIPhraseQuery` and pass it any options that fit your needs.
 * When your component renders, `useHowAmIPhraseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHowAmIPhraseQuery({
 *   variables: {
 *   },
 * });
 */
export function useHowAmIPhraseQuery(baseOptions?: Apollo.QueryHookOptions<HowAmIPhraseQuery, HowAmIPhraseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HowAmIPhraseQuery, HowAmIPhraseQueryVariables>(HowAmIPhraseDocument, options);
      }
export function useHowAmIPhraseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HowAmIPhraseQuery, HowAmIPhraseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HowAmIPhraseQuery, HowAmIPhraseQueryVariables>(HowAmIPhraseDocument, options);
        }
export type HowAmIPhraseQueryHookResult = ReturnType<typeof useHowAmIPhraseQuery>;
export type HowAmIPhraseLazyQueryHookResult = ReturnType<typeof useHowAmIPhraseLazyQuery>;
export type HowAmIPhraseQueryResult = Apollo.QueryResult<HowAmIPhraseQuery, HowAmIPhraseQueryVariables>;
export const BrandWordsDocument = gql`
    query BrandWords {
  brandWords {
    id
    word
  }
}
    `;

/**
 * __useBrandWordsQuery__
 *
 * To run a query within a React component, call `useBrandWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandWordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandWordsQuery(baseOptions?: Apollo.QueryHookOptions<BrandWordsQuery, BrandWordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandWordsQuery, BrandWordsQueryVariables>(BrandWordsDocument, options);
      }
export function useBrandWordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandWordsQuery, BrandWordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandWordsQuery, BrandWordsQueryVariables>(BrandWordsDocument, options);
        }
export type BrandWordsQueryHookResult = ReturnType<typeof useBrandWordsQuery>;
export type BrandWordsLazyQueryHookResult = ReturnType<typeof useBrandWordsLazyQuery>;
export type BrandWordsQueryResult = Apollo.QueryResult<BrandWordsQuery, BrandWordsQueryVariables>;
export const ModulesDocument = gql`
    query Modules {
  modules {
    id
    name
    year
  }
}
    `;

/**
 * __useModulesQuery__
 *
 * To run a query within a React component, call `useModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useModulesQuery(baseOptions?: Apollo.QueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
      }
export function useModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
        }
export type ModulesQueryHookResult = ReturnType<typeof useModulesQuery>;
export type ModulesLazyQueryHookResult = ReturnType<typeof useModulesLazyQuery>;
export type ModulesQueryResult = Apollo.QueryResult<ModulesQuery, ModulesQueryVariables>;
export const namedOperations = {
  Query: {
    CurrentUser: 'CurrentUser',
    HowAmIPhrase: 'HowAmIPhrase',
    BrandWords: 'BrandWords',
    Modules: 'Modules'
  },
  Mutation: {
    addMentalEnergy: 'addMentalEnergy',
    addHowAmIPhrase: 'addHowAmIPhrase',
    addBrandWord: 'addBrandWord',
    addWholeBrand: 'addWholeBrand',
    addModule: 'addModule',
    addAssignment: 'addAssignment'
  }
}