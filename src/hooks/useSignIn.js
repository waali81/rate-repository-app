import { useMutation, useApolloClient } from '@apollo/client/react';
import { gql } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;