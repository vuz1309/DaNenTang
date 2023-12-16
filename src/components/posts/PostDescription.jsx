import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import {APP_ROUTE} from '../../navigation/config/routes';
const {Colors} = require('../../utils/Colors');
const MAX_CAPTION_LENGTH = 50;

const PostDescription = ({described, color = Colors.textColor}) => {
  const {navigate} = useNavigation();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const extractLinks = text => {
    const linkRegex = /(https?:\/\/[^\s]+)|(#\w+)/g;
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

      if (match.startsWith('#')) {
        // Handle hashtag
        elements.push(
          <TouchableHighlight
            key={`hashtag_${index}`}
            underlayColor={Colors.lightgrey}
            style={{alignSelf: 'flex-start'}}
            onPress={() => handleHashtagPress(match)}>
            <Text style={{fontSize: 15, color: Colors.primaryColor}}>
              {match}
            </Text>
          </TouchableHighlight>,
        );
      } else {
        // Handle regular link
        elements.push(
          <TouchableHighlight
            key={`link_${index}`}
            style={{alignSelf: 'flex-start'}}
            onPress={() => handleLinkPress(match)}
            underlayColor={Colors.lightgrey}>
            <Text style={{fontSize: 15, color: Colors.primaryColor}}>
              {match}
            </Text>
          </TouchableHighlight>,
        );
      }

      lastIndex = startIndex + match.length;
    });

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      elements.push(
        <Text style={{fontSize: 15, color}} key={`remaining_${lastIndex}`}>
          {remainingText}
        </Text>,
      );
    }

    return elements;
  };
  // Hàm kiểm tra độ dài của caption và trả về nội dung hiển thị
  const htmlContent = useMemo(() => {
    return described.length <= MAX_CAPTION_LENGTH || isExpanded ? (
      <>{extractLinks(described)}</>
    ) : (
      <>
        {extractLinks(described.slice(0, MAX_CAPTION_LENGTH))}
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={{color: Colors.textGrey}}>
            {' '}
            {isExpanded ? 'Ẩn bớt' : '...Xem thêm'}
          </Text>
        </TouchableOpacity>
      </>
    );
  }, [isExpanded]);
  const handleHashtagPress = initialKeyword => {
    console.log('hastag press:', initialKeyword);
    navigate(APP_ROUTE.SEARCH, {initialKeyword});
  };
  const handleLinkPress = url => {
    navigate(APP_ROUTE.WEBVIEW, {url});
  };
  return <View>{htmlContent}</View>;
};

export default PostDescription;
