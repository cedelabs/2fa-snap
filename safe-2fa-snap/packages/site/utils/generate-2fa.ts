import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import {ApolloLink} from "apollo-link"
const proxyServer = process.env.PROXY_SERVER || ' https://cpcyqroq25awppsotsqmjsaybi.appsync-api.eu-west-1.amazonaws.com/graphql ';

const authLink = new ApolloLink((operation: any, forward: any) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      ["x-api-key"]: "da2-pg2z5surgjfmtlg7jcwnpn77he"
    }
  });
  return forward(operation)
})

const client = new ApolloClient({
  uri: proxyServer,
  cache: new InMemoryCache(),
  link: authLink
});

export const generate2fa = async (address: string) => {
  try {
    await client.query({
      query: gql`
    query {
  getSecretById(userId: "${address}") {
    secret,
    iExecPubKey
  }
} `,
    });
  } catch(e) {
    console.error(e)
    throw new Error('An error occured while sending TOTP');
  }
}
