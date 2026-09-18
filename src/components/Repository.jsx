import { FlatList, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const Repository = () => {
  const { id } = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      onEndReached={handleFetchMore}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ListHeaderComponent={() => (
        <RepositoryItem
          repository={data.repository}
          showGitHubButton={true}
        />
      )}
    />
  );
};

export default Repository;