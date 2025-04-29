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
                      style={[
                        { color: commonStyles.statusColor[button.type] },
                      ]}>
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
    width: '100%',
    height: '100%',
    backgroundColor: commonStyles.backgroundColor.backDropWithOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: commonStyles.color.white,
    borderRadius: commonStyles.radius.medium,
  },
  msg: {
    padding: commonStyles.spacings.large,
  },
  title: {
    color: commonStyles.textColor.default,
    textAlign: 'center',
    fontSize: commonStyles.fontSize.largeX,
    paddingTop: commonStyles.spacings.small,
    fontWeight: '800',
  },
  content: {
    color: commonStyles.textColor.info,
    textAlign: 'center',
    fontSize: commonStyles.fontSize.largeX,
    paddingVertical: commonStyles.spacings.small,
    lineHeight: commonStyles.lineHeight.large2X,
  },

  buttons: {
    borderTopWidth: 1,
    borderColor: commonStyles.color.gray3,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsCol: {
    alignItems: 'center',
  },

  button: {
    padding: commonStyles.spacings.medium,
  },

  breakLine: {
    backgroundColor: commonStyles.color.gray3,
  },
  breakLineRow: {
    width: 1,
  },
  breakLineCol: {
    height: 1,
    width: '100%',
  },
});
