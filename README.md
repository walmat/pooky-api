## Overview

This is a base repository for a GraphQL API.

The target audience for this repository is anyone looking to reverse pooky.

Looking for help? Add me on Discord: `orion#0001`

## Demonstration

##### GraphiQL Demonstration
https://vimeo.com/373469096

##### Client-Side Fetch Example
https://vimeo.com/373468734

## Getting Started

GraphQL consists of a type system, query language and execution semantics,
static validation, and type introspection, each outlined below. To guide you
through each of these components, I've written an example designed to
illustrate the various pieces of GraphQL.

This example is not exhausxtive, but it is designed to quickly introduce
the core concepts of GraphQL, to provide some context before diving into
the more detailed specification or the [GraphQL.js](https://github.com/graphql/graphql-js)
reference implementation.

The premise of the example is that we want to use GraphQL to query for
potential data (cookies, checkout form fields, etc).

### Structures

At the heart of any GraphQL implementation is a description of what types
of objects it can return, described in a GraphQL type system and returned
in the GraphQL Schema.

For this repository, I've created a package that handles all of the type
definitions for you in a shared space. Browse around the [structures](https://github.com/walmat/pooky-api/tree/master/packages/structures) packages to see the definitions I've setup
for the existing graphQL queries/mutations. 

**Important: this has been reverted to adapt to Supreme's new tactic of changing cookie names. All type checking has been loosened and both queries and mutations now accept a dynamic JSON (stringified) data structure**

For example, since all of the cookies are required strings (with the exception
of `pooky_use_cookie`), our type definitions for the cookies object is as follows:

```graphql
type Cookies {
  pooky: String!,
  pooky_owl: String!,
  pooky_data: String!,
  pooky_electric: String!,
  pooky_order_allow: String!,
  pooky_performance: String!,
  pooky_recaptcha: String!,
  pooky_recaptcha_coherence: String!,
  pooky_settings: String!,
  pooky_telemetry: String!,
  pooky_use_cookie: Boolean!,
  updated_pooky_coherence: String!,
}
```

This shorthand is convenient for describing the basic shape of a type
system; the JavaScript implementation is more full-featured, and allows types
and fields to be documented. It also sets up the mapping between the
type system and the underlying data; for a test case in GraphQL.js, the
underlying data is a [set of JavaScript objects](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js),
but in most cases the backing data will be accessed through some service, and
this type system layer will be responsible for mapping from types and fields to
that service.

A common pattern in many APIs, and indeed in GraphQL is to give
objects an ID that can be used to refetch the object. So let's add
that to our cookies type as well:

```graphql
type Cookies {
  id: String!,
  pooky: String!,
  pooky_owl: String!,
  pooky_data: String!,
  pooky_electric: String!,
  pooky_order_allow: String!,
  pooky_performance: String!,
  pooky_recaptcha: String!,
  pooky_recaptcha_coherence: String!,
  pooky_settings: String!,
  pooky_telemetry: String!,
  pooky_use_cookie: Boolean!,
  updated_pooky_coherence: String!,
}
```

Any new data structures should first be defined in this namespace to then
later be used by both: a) the redis/memory datastore, and b) the graphQL
query/mutation APIs.

One question you might ask, though, is whether any of those fields can return
`null`. By default, `null` is a permitted value for any type in GraphQL,
since fetching data to fulfill a GraphQL query often requires talking
to different services that may or may not be available. However, if the
type system can guarantee that a type is never null, then we can mark
it as Non Null in the type system. We indicate that in our shorthand
by adding an "!" after the type. We can update our type system to note
that the `id`, and all of the cookies is never null.

Note that while in our current implementation, we can guarantee that more
fields are non-null (since our current implementation has hard-coded data),
we didn't mark them as non-null. One can imagine we would eventually
replace our hardcoded data with a backend service, which might not be
perfectly reliable; by leaving these fields as nullable, we allow
ourselves the flexibility to eventually return null to indicate a backend
error, while also telling the client that the error occurred.

## Datastore

A pretty crucial piece to any pooky api is a data storage object to store the cookies
to be fetched. I decided to go with redis, and I've been utilizing it a lot recently.

(Note: One could easily swap out the datastore to be any form of database if they wanted to.
I left this pretty modular and basic, so it's an easy swap to Mongo/PostgreSQL/etc).

By default, I've defined 2 separate storage structures: `MemoryStore`, and `RedisStore`.

The `MemoryStore` is useful in development mode to quickly get up and running and doesn't require
any external processes to be running. 

See more about the datastore [here](https://github.com/walmat/pooky-api/tree/master/packages/datastore)

## Server (API)

The server package is where it all comes together. I've defined a super basic data API that can be used
to query and mutate data inside the `Store`. Let's look at some examples.

First, let's get the API up and running..

```md
#### install dependencies
yarn

#### build packages/*
yarn build

#### launch the api (in development mode)
yarn dev
```

A neat little playground called GraphiQL is enabled (only in development mode), for this API. You can access it [here](http://localhost:5000/api/v1/data). 

#### Queries / Mutations

If you're playing around in the GraphiQL playground, we can demonstrate how this api will work and look.

Go ahead and paste the following mutation in the left-hand panel of the dashboard

```graphql
mutation {
  addCookies(data: {
    pooky: "55bd0c5d-2e36-4f4f-aeb9-eaa8fe00aecf",
    pooky_owl: "6800974eb7b26d7408c0c617a53388d744349b640cdc34ba61f2f4829fbf7ced",
    pooky_data: "b4ad1771e7278cd938c0789dccf528c6935c70b50d1300ac03abbb50e857bfd0",
    pooky_electric: "ca5d35456efc96de36af9274269bbcbcd2c158c846c4051baaa2de5efa574e2e",
    pooky_order_allow: "eyJ0b2hydV9vayI6IHRydWUsImVuYWJszwiQOiB0cnVlLCJhbGxfcmVsZWFzZXMiOnRydWUsInNwbGF5X2VudiI6InByb2QiLCAibW91c2Vfc2NvcmUiOjEwMCwiYnlwYXNzIjp0cnVlfQ",
    pooky_performance: "90ff67084a669a673d32424c716f6f6b98a59dd83d5116e8187df230550341b892fff72ab92932237c175603d6f4fdc4",
    pooky_recaptcha: "e97aea62ce991cbb72af50a9d79110d6fe4b7eac7e44abbb87bebcb5095b88c1edd028289cebf2c1fb1e69d684b8595f",
    pooky_recaptcha_coherence: "0a48537c18a172c964265b8e0487a8e1d1f09151920859249c2f1d2a2c05fa1b57fd5c2a5766ad2545c43847ce4cc3d5",
    pooky_settings: "6bca6fffcbd6aa398905fb9dc2a3ca1f8c803de2eee4f45fb41a4ffc70061fa1f5d3575bf720aabc2be8efb74d850bec",
    pooky_telemetry: "67db023465119f3486c7aae6378e1b6eed727986fa248edbb36322217cc997baa78579a0239e472d3e1f343e2f79b318",
    pooky_use_cookie: true,
    updated_pooky_coherence: "bafd60d036cf80654d46b78341625b11ba67fe510fbbba40d71c00ed6a8f59cb",
  }) {
    pooky,
    pooky_owl,
    pooky_data,
    pooky_electric,
    pooky_order_allow,
    pooky_performance,
    pooky_recaptcha,
    pooky_recaptcha_coherence,
    pooky_settings,
    pooky_telemetry,
    pooky_use_cookie,
    updated_pooky_coherence,
  }
}
``` 

Please note: these are dummy values just used for demonstration, do not assume these are correct.

Your screen should look like the following:

![Mutation](https://github.com/walmat/pooky-api/blob/master/public/mutation.PNG)

Hit the big `play` icon to perform the mutation. 

![Mutation](https://github.com/walmat/pooky-api/blob/master/public/mutation-done.PNG)

Congrats, you just performed a simple graphQL mutation!

Now, this is all stored in memory as of now, so when we shutdown the API, we will lose all data stored in the Store.

However, we can view the currently stored cookies by performing a `Query`.

```graphql
{
  cookies {
    pooky
    pooky_owl
    pooky_data
    pooky_electric
    pooky_order_allow
    pooky_performance
    pooky_recaptcha
    pooky_recaptcha_coherence
    pooky_settings
    pooky_telemetry
    pooky_use_cookie
    updated_pooky_coherence
  }
}
```

This should look like:

![query](https://github.com/walmat/pooky-api/blob/master/public/query.PNG)

Now, hit the `play` icon to perform the query on the datastore that holds cookies.

![query-done](https://github.com/walmat/pooky-api/blob/master/public/query-done.PNG)

Simple, right? I've left some programatic examples [here](https://github.com/walmat/pooky-api/tree/master/packages/datastore/examples).

### Additional Content /  Resources

1. https://github.com/schickling/timemachine
2. https://github.com/paulirish/break-on-access
3. https://github.com/krpar/pooky-browser (shoutout to [@krpar](https://github.com/krpar) for this)

This README scratches the surface on what GraphQL is capable of, to find out
more about what it's used for, please refer to it's [documentation](https://graphql.org).
