import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput
} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

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
  searchKeyword,
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 20,
              margin: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>🔍</Text>

            <TextInput
              placeholder="Search repositories..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              style={{
                flex: 1,
                padding: 10,
              }}
            />

            <Pressable onPress={() => setSearchKeyword('')}>
              <Text style={{ fontSize: 20 }}>✕</Text>
            </Pressable>
          </View>
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
        </View>
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, loading } = useRepositories({
    ...order,
    searchKeyword: debouncedSearchKeyword,
  });

  const navigate = useNavigate();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <RepositoryListContainer
    repositories={repositories}
    navigate={navigate}
    order={order}
    setOrder={setOrder}
    searchKeyword={searchKeyword}
    setSearchKeyword={setSearchKeyword}
  />;
};

export default RepositoryList;