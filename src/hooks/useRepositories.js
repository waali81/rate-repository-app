import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
  orderBy = 'CREATED_AT',
  orderDirection = 'DESC',
  searchKeyword = '',
} = {}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables:{
      orderBy,
      orderDirection,
      searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data?.repositories;

  return { repositories, loading, error };
};

export default useRepositories;