import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']
  user: User
}

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type CreateStraffepilsReturn = {
  __typename?: 'CreateStraffepilsReturn'
  ok?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createOrganization: Organization
  createStraffepils: CreateStraffepilsReturn
  deleteOrganization: Organization
  loginUser: SignupUserReturn
  signupUser: SignupUserReturn
  updateOrganization: Organization
}

export type MutationCreateOrganizationArgs = {
  data: CreateOrganizationInput
}

export type MutationCreateStraffepilsArgs = {
  data: StraffepilsCreateInput
}

export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']
}

export type MutationLoginUserArgs = {
  data: UserLoginInput
}

export type MutationSignupUserArgs = {
  data: UserCreateInput
}

export type MutationUpdateOrganizationArgs = {
  data: UpdateOrganizationInput
  id: Scalars['Int']
}

export type Organization = {
  __typename?: 'Organization'
  description?: Maybe<Scalars['String']>
  id: Scalars['Int']
  name: Scalars['String']
  users: Array<User>
}

export type OrganizationOrderByInput = {
  description?: InputMaybe<Sort>
  name?: InputMaybe<Sort>
}

export type Query = {
  __typename?: 'Query'
  allOrganizations?: Maybe<Array<Maybe<Organization>>>
  allStraffepils?: Maybe<Array<Maybe<Straffepils>>>
  allUsers?: Maybe<Array<Maybe<User>>>
  isLoggedIn: Scalars['Boolean']
  me?: Maybe<User>
  organization?: Maybe<Organization>
  straffepils?: Maybe<Straffepils>
  user?: Maybe<User>
}

export type QueryAllOrganizationsArgs = {
  filterString?: InputMaybe<Scalars['String']>
  orderBy?: InputMaybe<Array<OrganizationOrderByInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryAllStraffepilsArgs = {
  byGiver?: InputMaybe<Scalars['Int']>
  byReceiver?: InputMaybe<Scalars['Int']>
  filterString?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryAllUsersArgs = {
  filterString?: InputMaybe<Scalars['String']>
  orderBy?: InputMaybe<Array<UserOrderByInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryOrganizationArgs = {
  id: Scalars['Int']
}

export type QueryStraffepilsArgs = {
  id: Scalars['Int']
}

export type QueryUserArgs = {
  id: Scalars['Int']
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SignupUserReturn = {
  __typename?: 'SignupUserReturn'
  token?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export enum Sort {
  Asc = 'asc',
  Desc = 'desc',
}

export type Straffepils = {
  __typename?: 'Straffepils'
  confirmed?: Maybe<Scalars['Boolean']>
  giver: User
  giverId: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  receiver: User
  receiverId: Scalars['Int']
}

export type StraffepilsCreateInput = {
  amount: Scalars['Int']
  giverId: Scalars['Int']
  reason: Scalars['String']
  receiverId: Scalars['Int']
}

export type StraffepilsOrderByInput = {
  amount?: InputMaybe<Sort>
  giverId?: InputMaybe<Sort>
  reason?: InputMaybe<Sort>
  receiverId?: InputMaybe<Sort>
}

export type StraffepilsUpdateInput = {
  amount?: InputMaybe<Scalars['Int']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  giverId?: InputMaybe<Scalars['Int']>
  reason?: InputMaybe<Scalars['String']>
  receiverId?: InputMaybe<Scalars['Int']>
}

export type UpdateOrganizationInput = {
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['Int']
  lastName: Scalars['String']
  organization?: Maybe<Organization>
  role: Role
}

export type UserCreateInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  organizationId: Scalars['Int']
  password: Scalars['String']
  role: Role
}

export type UserLoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type UserOrderByInput = {
  email?: InputMaybe<Sort>
  firstName?: InputMaybe<Sort>
  lastName?: InputMaybe<Sort>
  organization?: InputMaybe<Sort>
  role?: InputMaybe<Sort>
}

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
}

export type LoginMutationVariables = Exact<{
  data: UserLoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  loginUser: {
    __typename?: 'SignupUserReturn'
    token?: string | null
    user?: { __typename?: 'User'; id: number } | null
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: number
    email: string
    firstName: string
    lastName: string
    role: Role
    organization?: { __typename?: 'Organization'; id: number } | null
  } | null
}

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never }>

export type IsLoggedInQuery = { __typename?: 'Query'; isLoggedIn: boolean }

export type CreateStraffepilsMutationVariables = Exact<{
  data: StraffepilsCreateInput
}>

export type CreateStraffepilsMutation = {
  __typename?: 'Mutation'
  createStraffepils: {
    __typename?: 'CreateStraffepilsReturn'
    ok?: boolean | null
  }
}

export type AllStraffepilsQueryVariables = Exact<{
  byReceiver?: InputMaybe<Scalars['Int']>
}>

export type AllStraffepilsQuery = {
  __typename?: 'Query'
  allStraffepils?: Array<{
    __typename?: 'Straffepils'
    giverId: number
    receiverId: number
    reason?: string | null
    receiver: { __typename?: 'User'; id: number }
    giver: { __typename?: 'User'; id: number }
  } | null> | null
}

export const LoginDocument = gql`
  mutation Login($data: UserLoginInput!) {
    loginUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
      organization {
        id
      }
    }
  }
`

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  })
}
export const IsLoggedInDocument = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`

export function useIsLoggedInQuery(
  options?: Omit<Urql.UseQueryArgs<IsLoggedInQueryVariables>, 'query'>
) {
  return Urql.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>({
    query: IsLoggedInDocument,
    ...options,
  })
}
export const CreateStraffepilsDocument = gql`
  mutation CreateStraffepils($data: StraffepilsCreateInput!) {
    createStraffepils(data: $data) {
      ok
    }
  }
`

export function useCreateStraffepilsMutation() {
  return Urql.useMutation<
    CreateStraffepilsMutation,
    CreateStraffepilsMutationVariables
  >(CreateStraffepilsDocument)
}
export const AllStraffepilsDocument = gql`
  query AllStraffepils($byReceiver: Int) {
    allStraffepils(byReceiver: $byReceiver) {
      giverId
      receiverId
      reason
      receiver {
        id
      }
      giver {
        id
      }
    }
  }
`

export function useAllStraffepilsQuery(
  options?: Omit<Urql.UseQueryArgs<AllStraffepilsQueryVariables>, 'query'>
) {
  return Urql.useQuery<AllStraffepilsQuery, AllStraffepilsQueryVariables>({
    query: AllStraffepilsDocument,
    ...options,
  })
}
import { IntrospectionQuery } from 'graphql'
export default {
  __schema: {
    queryType: {
      name: 'Query',
    },
    mutationType: {
      name: 'Mutation',
    },
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'AuthPayload',
        fields: [
          {
            name: 'token',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'user',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateStraffepilsReturn',
        fields: [
          {
            name: 'ok',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Mutation',
        fields: [
          {
            name: 'createOrganization',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Organization',
                ofType: null,
              },
            },
            args: [
              {
                name: 'data',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createStraffepils',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateStraffepilsReturn',
                ofType: null,
              },
            },
            args: [
              {
                name: 'data',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'deleteOrganization',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Organization',
                ofType: null,
              },
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'loginUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SignupUserReturn',
                ofType: null,
              },
            },
            args: [
              {
                name: 'data',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'signupUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SignupUserReturn',
                ofType: null,
              },
            },
            args: [
              {
                name: 'data',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'updateOrganization',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Organization',
                ofType: null,
              },
            },
            args: [
              {
                name: 'data',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Organization',
        fields: [
          {
            name: 'description',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'users',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'User',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: 'allOrganizations',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Organization',
                ofType: null,
              },
            },
            args: [
              {
                name: 'filterString',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'orderBy',
                type: {
                  kind: 'LIST',
                  ofType: {
                    kind: 'NON_NULL',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any',
                    },
                  },
                },
              },
              {
                name: 'skip',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'take',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
            ],
          },
          {
            name: 'allStraffepils',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Straffepils',
                ofType: null,
              },
            },
            args: [
              {
                name: 'byGiver',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'byReceiver',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'filterString',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'skip',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'take',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
            ],
          },
          {
            name: 'allUsers',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null,
              },
            },
            args: [
              {
                name: 'filterString',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'orderBy',
                type: {
                  kind: 'LIST',
                  ofType: {
                    kind: 'NON_NULL',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any',
                    },
                  },
                },
              },
              {
                name: 'skip',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'take',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
            ],
          },
          {
            name: 'isLoggedIn',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'me',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'organization',
            type: {
              kind: 'OBJECT',
              name: 'Organization',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'straffepils',
            type: {
              kind: 'OBJECT',
              name: 'Straffepils',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'user',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null,
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'SignupUserReturn',
        fields: [
          {
            name: 'token',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'user',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Straffepils',
        fields: [
          {
            name: 'confirmed',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'giver',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'giverId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'reason',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'receiver',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'receiverId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'User',
        fields: [
          {
            name: 'email',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'firstName',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'lastName',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'organization',
            type: {
              kind: 'OBJECT',
              name: 'Organization',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'role',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'SCALAR',
        name: 'Any',
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery
