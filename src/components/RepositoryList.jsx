import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  order,
  setOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <Picker
          selectedValue={`${order.orderBy}-${order.orderDirection}`}
          onValueChange={value => {
            const [orderBy, orderDirection] = value.split('-');
            setOrder({ orderBy, orderDirection });
          }}
        >
          <Picker.Item
            label="Select order:"
            value=""
            enabled={false}
          />
          <Picker.Item
            label="Latest repositories"
            value="CREATED_AT-DESC"
          />
          <Picker.Item
            label="Highest rated repositories"
            value="RATING_AVERAGE-DESC"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="RATING_AVERAGE-ASC"
          />
        </Picker>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const { repositories, loading } = useRepositories(order);

  const navigate = useNavigate();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <RepositoryListContainer
    repositories={repositories}
    navigate={navigate}
    order={order}
    setOrder={setOrder}
  />;
};

export default RepositoryList;