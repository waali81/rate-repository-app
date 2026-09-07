import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
});

const toThousands = (number) => {
  if (number < 1000) {
    return number;
  }

  return `${(number / 1000).toFixed(1)}k`;
};

const RepositoryStats = ({ repository }) => {
  return (
    <View style={styles.stats}>
      <View style={styles.stat}>
        <Text fontWeight="bold">
          {toThousands(repository.stargazersCount)}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>

      <View style={styles.stat}>
        <Text fontWeight="bold">
          {toThousands(repository.forksCount)}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>

      <View style={styles.stat}>
        <Text fontWeight="bold">{repository.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>

      <View style={styles.stat}>
        <Text fontWeight="bold">{repository.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;