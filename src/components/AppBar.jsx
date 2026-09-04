import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Pressable>
            <Text style={styles.text}>Repositories</Text>
        </Pressable>
    </View>
  )
};

export default AppBar;