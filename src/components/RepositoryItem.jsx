import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  row:{
    flexDirection: 'row',
  },
  content: {
    marginLeft: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 10,
  },
  fullName: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  }
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />

        <View style={styles.content}>
          <Text fontWeight="bold" style={styles.fullName}>{repository.fullName}</Text>
          <Text color="textSecondary" style={styles.description}>{repository.description}</Text>
          <Text color="white" style={styles.language}>
            {repository.language}
          </Text>
        </View>
      </View>
      <RepositoryStats repository={repository} />
    </View>
  );
};

export default RepositoryItem;