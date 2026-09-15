import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
  },
});

const AppBarTab = ({me}) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      {me && (
        <Link to="/createreview">
          <Text style={styles.text}>Create a review</Text>
        </Link>
      )}
      <Link to={me ? '/' : '/signin'} onPress={me ? signOut : undefined}>
        <Text style={styles.text}>{me ? 'Sign out' : 'Sign in'}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;