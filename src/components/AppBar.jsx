import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab me={data?.me} />
      </ScrollView>
    </View>
  )
};

export default AppBar;