import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {APP_ROUTE} from '../../navigation/config/routes';
const {Colors} = require('../../utils/Colors');
const MAX_CAPTION_LENGTH = 50;

const PostDescription = ({described, color = Colors.textColor}) => {
  const {navigate} = useNavigation();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const extractLinks = text => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(linkRegex);

    if (!matches) {
      return <Text style={{fontSize: 15, color}}>{text}</Text>;
    }

    const elements = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      const startIndex = text.indexOf(match, lastIndex);
      const beforeText = text.substring(lastIndex, startIndex);
      elements.push(
        <Text style={{fontSize: 15, color}} key={`before_${index}`}>
          {beforeText}
        </Text>,
      );
      elements.push(
        <Text
          key={`link_${index}`}
          style={{fontSize: 15, color: Colors.primaryColor}}
          onPress={() => handleLinkPress(match)}>
          {match}
        </Text>,
      );
      lastIndex = startIndex + match.length;
    });

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      elements.push(
        <Text style={{fontSize: 15, color}} key="remaining">
          {remainingText}
        </Text>,
      );
    }

    return elements;
  };
  // Hàm kiểm tra độ dài của caption và trả về nội dung hiển thị
  const htmlContent = useMemo(() => {
    if (described.length <= MAX_CAPTION_LENGTH || isExpanded) {
      return <>{extractLinks(described)}</>;
    } else {
      return (
        <>
          {extractLinks(described.slice(0, MAX_CAPTION_LENGTH))}
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Text style={{color: Colors.textGrey}}>...Xem thêm</Text>
          </TouchableOpacity>
        </>
      );
    }
  }, [isExpanded]);

  const handleLinkPress = url => {
    navigate(APP_ROUTE.WEBVIEW, {url});
  };
  return <View>{htmlContent}</View>;
};

export default PostDescription;
