# React Frontend Template

This template is used to initiate a barebones setup of our common frontend stack. Do this (from the root folder of this repo):

```bash
$ cd frontend
$ yarn install
$ yarn start
```

## Urql

You may be familiar with `Apollo Graphql` from previous projects. With this template we're switching to `Urql`, with some handy associated tools.

The setup of the Urql client in the `urqlClient.ts` file (analog to the old `apolloClient.ts` file) is pretty straightforward, though a bit different. The file shipped with this template shouldn't require a lot of changes, though. Urql uses the concept of "extensions" (similar to Apollo Client "links") to insert middleware into the GraphQL pipeline. There exists a bunch of pre-created extensions, both official and unofficial.

Previosly we have written GraphQL queries and mutations in `.ts` files using the `gql` tag. From now on we'll be writing directly in `.graphql` files. This is very similar; see an example below:

```typescript
// Previously, in queries.ts
const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      email
    }
  }
`
```

```graphql
# Now, in queries.graphql
query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
```

This is just simpler, and provides better compatibility with certain VS Code (and probably other IDE) extensions. Foremost of these is `graphql-codegen`.

Another thing that's nice to mention about Urql is that it's compatible out of the box with React, React Native, Preact, Svelte and Vue. It's also a lot smaller (bindle-size-wise) than Apollo. And it has "Ur" in the name, heh.

## GraphQL-codegen

Whenever the GraphQL schema has been changed (the available queries and mutations on the backend), run this command (on the frontend):

```bash
$ yarn generate
```

This will generate a bunch of code in the file `src/generated/graphql.ts`. Primarily, it generates hooks for all defined queries and mutations (in the previously mentioned `.graphql`-files). So this means that we can do the below:

```typescript
// Previously
const { data, loading, error, refetch } = useQuery(ME_QUERY)

// Now
const [{ data, fetching, error }, refetch] = useMeQuery()
```

This `useMeQuery` hook is, to be clear, automatically created when we run `yarn generate`, as long as we have the above `query Me { ... }` in any `.graphql` file in the project. The same is true for mutations.

As you can see the signature of the hook is slightly different than before, but this is something we'll quickly get used to.

`yarn generate` also generates TypeScript types for all generated query/mutation hooks.

## The GraphQL extension

Everyone should install the [official GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql). This adds automatic schema-sync with the backend, and autocompletion/type checking in all `.graphql` files. The config is super simple, and lies in the attached `.graphqlrc.yml` file. Just replace the url with the url of your graphql endpoint.

```yml
schema: http://0.0.0.0:4000/graphql
```

## Urql Devtools

There's also a handy [Chrome](https://chrome.google.com/webstore/detail/urql-devtools/mcfphkbpmkbeofnkjehahlmidmceblmm)/[Firefox](https://addons.mozilla.org/en-GB/firefox/addon/urql-devtools/) extension available for Urql. The `urqlClient.ts` file already contains the required setup for this.
