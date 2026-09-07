import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

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

const AppBarTab = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;