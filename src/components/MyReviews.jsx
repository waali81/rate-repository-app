import { FlatList, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client/react';

import { GET_CURRENT_USER, DELETE_REVIEW } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = id => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview({
              variables: { id },
            });

            await refetch();
          },
        },
      ]
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      contentContainerStyle={{ paddingTop: 10 }}
      /* renderItem={({ item }) => <ReviewItem review={item} showRepository />} */
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showRepository
          showActions
          onDelete={() => handleDelete(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MyReviews;