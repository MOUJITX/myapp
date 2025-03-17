import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button, { ButtonShapeType } from '../../components/basic/Button';

export const PageB = () => {
  return (
    <>
      <View style={styles.optionButtons}>
        <Button shape={ButtonShapeType.NoRadius} type="info" label="A" />
        <Button
          shape={ButtonShapeType.NoRadius}
          type="primary"
          label="Option B"
        />
        <Button shape={ButtonShapeType.NoRadius} type="info" label="Option C" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  optionButtons: {
    flexDirection: 'row',
  },
});
