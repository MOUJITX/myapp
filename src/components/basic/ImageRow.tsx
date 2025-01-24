import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from './Image';
import { commonStyles, ImageSize } from '../../styles';

interface Props {
  imgs: string[];
  size: ImageSize;
  radius?: boolean;
  disabled?: boolean;
}

export default (props: Props) => {
  return (
    <View style={styles(props).container}>
      {props.imgs.map((img, index) => (
        <Image img={img} size={props.size} radius={props.radius} key={index} />
      ))}
      {!props.disabled && (
        <View style={styles(props).addButton}>
          <Text style={styles(props).addButtonText}>+</Text>
        </View>
      )}
    </View>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: commonStyles.spacings.smallX,
      flexWrap: 'wrap',
    },
    addButton: {
      width: commonStyles.imageSize[props.size],
      height: commonStyles.imageSize[props.size],
      borderRadius: props.radius ? commonStyles.radius.medium : undefined,
      backgroundColor: commonStyles.color.gray2,
      borderWidth: 1,
      borderColor: commonStyles.color.gray4,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      fontSize: commonStyles.fontSize.large4X,
      color: commonStyles.color.gray6,
      fontWeight: '300',
    },
  });
