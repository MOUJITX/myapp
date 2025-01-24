import React from 'react';
import { Image } from 'react-native';
import { commonStyles, ImageSize } from '../../styles';

export interface Props {
  img: string;
  size: ImageSize;
  radius?: boolean;
}

export default (props: Props) => {
  return (
    <Image
      source={{ uri: props.img }}
      style={{
        width: commonStyles.imageSize[props.size],
        height: commonStyles.imageSize[props.size],
        borderRadius: props.radius ? commonStyles.radius.medium : undefined,
      }}
    />
  );
};
