import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
  },
  reviewText: {
    marginLeft: 60,
},
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text fontWeight="bold" color="primary">{review.rating}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
        </View>
      </View>

      <View style={styles.reviewText}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;