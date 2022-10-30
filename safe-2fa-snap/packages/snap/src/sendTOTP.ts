import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const proxyServer = process.env.PROXY_SERVER || 'http://proxy-server';

const client = new ApolloClient({
  uri: proxyServer,
  cache: new InMemoryCache(),
});

export const sendTOTP = async (code: string) => {
  try {
    await client.query({
      query: gql`
    query {
      code: "${code}"
    }`,
    });
  } catch {
    throw new Error('An error occured while sending TOTP');
  }

};
