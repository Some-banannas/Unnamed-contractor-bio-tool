import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    credentials: "include",
    uri: 'http://localhost:4000/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        });
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client =
    new ApolloClient({
        cache: new InMemoryCache(),
        // link:  linkTest.concat(uploadLink) 
        link: from([errorLink, httpLink])
    });