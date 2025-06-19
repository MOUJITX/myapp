import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../../styles';
import { statusType } from '../../types';

interface Props {
  visible: boolean;
  title?: string;
  content: string;
  buttonsInline?: boolean;
  buttons: { label: string; onPress: () => void; type: statusType }[];
}

export default (props: Props) => {
  return (
    <Modal transparent statusBarTranslucent visible={props.visible}>
      <View style={styles.backDrop}>
        <View style={styles.popup}>
          <View style={styles.msg}>
            {props.title && <Text style={styles.title}>{props.title}</Text>}
            <Text style={styles.content}>{props.content}</Text>
          </View>
          <View
            style={[
              styles.buttons,
              props.buttonsInline ? styles.buttonsRow : styles.buttonsCol,
            ]}>
            {props.buttons.map((button, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity onPress={button.onPress}>
                  <View style={styles.button}>
                    <Text
                      style={{ color: commonStyles.statusColor[button.type] }}>
                      {button.label}
                    </Text>
                  </View>
                </TouchableOpacity>
                {index !== props.buttons.length - 1 && (
                  <View
                    style={[
                      styles.breakLine,
                      props.buttonsInline
                        ? styles.breakLineRow
                        : styles.breakLineCol,
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    alignItems: 'center',
    backgroundColor: commonStyles.backgroundColor.backDropWithOpacity,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  breakLine: {
    backgroundColor: commonStyles.color.gray3,
  },
  breakLineCol: {
    height: 1,
    width: '100%',
  },
  breakLineRow: {
    width: 1,
  },
  button: {
    padding: commonStyles.spacings.medium,
  },

  buttons: {
    borderColor: commonStyles.color.gray3,
    borderTopWidth: 1,
  },
  buttonsCol: {
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  content: {
    color: commonStyles.textColor.info,
    fontSize: commonStyles.fontSize.largeX,
    lineHeight: commonStyles.lineHeight.large2X,
    paddingVertical: commonStyles.spacings.small,
    textAlign: 'center',
  },

  msg: {
    padding: commonStyles.spacings.large,
  },
  popup: {
    backgroundColor: commonStyles.color.white,
    borderRadius: commonStyles.radius.medium,
    width: '80%',
  },
  title: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: '800',
    paddingTop: commonStyles.spacings.small,
    textAlign: 'center',
  },
});
