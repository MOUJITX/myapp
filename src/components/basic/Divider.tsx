import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles } from '../../styles';

interface Props {
  gradient?: boolean;
}

export default (props: Props) => {
  return (
    <LinearGradient
      colors={
        props.gradient
          ? ['transparent', commonStyles.color.gray3, 'transparent']
          : [commonStyles.color.gray4, commonStyles.color.gray3]
      }
      locations={props.gradient ? [0, 0.5, 1] : [0, 1]}
      style={styles.divider}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: commonStyles.spacings.smallX,
  },
});
