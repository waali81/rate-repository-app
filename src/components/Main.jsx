import AppBar from './AppBar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<Repository />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;