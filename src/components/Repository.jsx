import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const Repository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryItem
      repository={data.repository}
      showGitHubButton={true}
    />
  );
};

export default Repository;