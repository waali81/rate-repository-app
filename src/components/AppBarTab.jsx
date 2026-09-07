import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
  },
});

const AppBarTab = () => {
  return (
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;