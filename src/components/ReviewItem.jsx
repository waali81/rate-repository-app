import { View, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';

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
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({
  review,
  showRepository = false,
  showActions = false,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text fontWeight="bold" color="primary">{review.rating}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text fontWeight="bold">
            {showRepository ? review.repository.fullName : review.user.username}
          </Text>
          <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
        </View>
      </View>

      <View style={styles.reviewText}>
        <Text>{review.text}</Text>
      </View>

      {showActions && (
        <View style={styles.actions}>
          <Pressable
            style={styles.button}
            onPress={() => navigate(`/repositories/${review.repository.id}`)}
          >
            <Text color="white" fontWeight="bold">View repository</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.deleteButton]} onPress={onDelete}>
            <Text color="white" fontWeight="bold">Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;