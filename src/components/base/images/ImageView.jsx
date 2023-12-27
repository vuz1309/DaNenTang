import React, {useState} from 'react';
import {Image, StyleProp} from 'react-native';
import LoadingOverlay from '../LoadingOverlay';

/**
 *
 * @param {object} param0
 * @param {StyleProp<Image>} param0.imageStyles
 * @returns
 */
const ImageView = ({
  uri,
  defaultSource = require('../../../assets/images/avatar_null.jpg'),
  errorSource = require('../../../assets/images/videoNull.png'),
  imageStyles = {},
}) => {
  const source = React.useMemo(
    () => (uri?.trim() ? {uri} : defaultSource),
    [uri],
  );
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <>
      {
        <LoadingOverlay
          backgroundColor="rgba(0,0,0,0.3)"
          size={'small'}
          isLoading={loading}
          style={imageStyles}
        />
      }
      {hasError ? (
        <Image
          source={errorSource}
          style={[
            {width: '100%', height: '100%', resizeMode: 'cover'},
            imageStyles,
          ]}
        />
      ) : (
        <Image
          source={source}
          defaultSource={defaultSource}
          onLoadEnd={onLoadEnd}
          onError={onError}
          style={[
            {width: '100%', height: '100%', resizeMode: 'cover'},
            imageStyles,
          ]}
        />
      )}
    </>
  );
};

export default React.memo(ImageView, (prev, next) => prev.uri === next.uri);
