import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface IProps {
  searchText?: string;
  onSearchChange: (search: string) => void;
  onAddClick: () => void;
}

const PostListTop = (props: IProps) => {
  const { searchText, onSearchChange, onAddClick } = props;

  return (
    <View style={stl.top}>
      <View style={stl.searchBar}>
        <Icon style={stl.searchBarIcon} name="search" />
        <TextInput
          style={stl.searchBarInput}
          value={searchText}
          onChangeText={onSearchChange}
          placeholder="Pesquise um post"
          placeholderTextColor="#000"
        />
      </View>
      <View style={stl.newPost}>
        <TouchableOpacity onPress={onAddClick}>
          <Icon style={stl.newPostIcon} name="plus" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stl = StyleSheet.create({
  top: {
    ...Platform.select({
      android: {
        marginTop: 15,
      },
    }),
    marginHorizontal: 15,
    marginBottom: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 20,
  },
  searchBarIcon: {
    padding: 10,
    fontSize: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarInput: {
    flex: 1,
    paddingVertical: 10,
  },
  newPost: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPostIcon: {
    fontSize: 20,
  },
});

export default PostListTop;
