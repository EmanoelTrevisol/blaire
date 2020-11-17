import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createPost as createPostAction } from '@store/posts/actions';
import CreateEditModal from '@components/posts/CreateEditModal';
import { treatError } from '../../errors/handler';

export interface IProps {
  searchText?: string;
  onSearchChange: (search: string) => void;
}

const modalProps = {
  title: 'Novo post',
  buttonTitle: 'Criar',
  isCreate: true,
};

const PostListTop = (props: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { searchText, onSearchChange } = props;

  const createPost = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    try {
      setIsSubmitting(true);

      await dispatch(createPostAction({ title, body }));
    } catch (error) {
      setIsSubmitting(false);
      return treatError(
        error,
        'Tivemos um problema ao criar seu post. Por favor, tente novamente',
      );
    }
  };

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon style={stl.newPostIcon} name="plus" />
        </TouchableOpacity>
      </View>
      <CreateEditModal
        {...modalProps}
        isSubmitting={isSubmitting}
        visible={modalVisible}
        post={null}
        close={() => setModalVisible(false)}
        onSubmit={createPost}
      />
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
