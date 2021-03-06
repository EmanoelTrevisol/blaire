import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';

import { updatePost } from '@store/posts/actions';
import PostCard from './PostCard';
import { Post } from '@models/Post';
import CreateEditModal from './CreateEditModal';
import { treatError } from '../../errors/handler';
import Colors from '@assets/colors';

interface IProps {
  refreshing: boolean;
  onRefresh: () => {};
  data: Post[];
  showEditIcon: boolean;
  confirmDelete?: Function;
  listEmptyStateComp: JSX.Element;
}

const modalInfo = {
  title: 'Editar post',
  buttonTitle: 'Editar',
};

const PostsList = (props: IProps) => {
  const [postEditData, setPostEditData] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <PostCard
        {...item}
        onEditPress={() => prepareEditPost(item)}
        showEditIcon={props.showEditIcon}
        onDeletePress={() => {
          props.confirmDelete && props.confirmDelete(item.id);
        }}
      />
    );
  };

  const prepareEditPost = (postData: Post) => {
    setPostEditData(postData);
    setModalVisible(true);
  };

  const editPost = async (data: { title: string; body: string }) => {
    try {
      setIsSubmitting(true);

      dispatch(updatePost(postEditData?.id!, data));
      clearData();
    } catch (error) {
      clearData();
      return treatError(
        error,
        'Houve um problema ao editar o post. Por favor, tente novamente',
      );
    }
  };

  const clearData = () => {
    setPostEditData(null);
    setModalVisible(false);
    setIsSubmitting(false);
  };

  return (
    <>
      {(props.showEditIcon && (
        <CreateEditModal
          {...modalInfo}
          isCreate={false}
          onSubmit={editPost}
          post={postEditData}
          isSubmitting={isSubmitting}
          close={clearData}
          visible={modalVisible}
        />
      )) ||
        null}
      <FlatList
        data={props.data}
        keyExtractor={(itm) => itm.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={props.listEmptyStateComp}
      />
    </>
  );
};

export default PostsList;
