import {View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

import FilePost from './FilePost';

/**
 *
 * @param {object} props
 * @returns
 */
const PostDisplay = ({item, setIsShowDialogCoins, isShowRemove = false}) => {
  return (
    <View style={{backgroundColor: Colors.white, marginTop: 8}}>
      <PostHeader
        isShowRemove={isShowRemove}
        data={item}
        setIsShowDialogCoins={setIsShowDialogCoins}
      />

      <FilePost item={item} />

      <PostFooter data={item} />
    </View>
  );
};

export default React.memo(
  PostDisplay,
  (prev, next) => JSON.stringify(prev.item) == JSON.stringify(next.item),
);
