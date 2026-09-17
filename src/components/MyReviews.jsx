import { FlatList, View } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const MyReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      contentContainerStyle={{ paddingTop: 10 }}
      renderItem={({ item }) => <ReviewItem review={item} showRepository />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MyReviews;