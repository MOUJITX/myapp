import { t } from 'i18next';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Popup from './Popup';
import Tag, { TagShapeType } from './Tag';
import { Props as TipProps } from './Tag';

export const ButtonShapeType = {
  ...TagShapeType,
};

export interface Props extends TipProps {
  onPress?: () => void;
  pressConfirm?: { title?: string; description: string };
}

export default (props: Props) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const handleButtonPress = () => {
    if (props.pressConfirm) {
      setShowConfirmDialog(true);
      return;
    }

    props.onPress && props.onPress();
  };

  return (
    <>
      <TouchableOpacity onPress={handleButtonPress}>
        <Tag {...props} label={props.label ?? t('component.button.label')} />
      </TouchableOpacity>

      {props.pressConfirm && (
        <Popup
          visible={showConfirmDialog}
          title={props.pressConfirm.title}
          content={props.pressConfirm.description}
          buttonsInline
          buttons={[
            {
              label: t('common.cancel.label'),
              onPress: () => setShowConfirmDialog(false),
              type: 'default',
            },
            {
              label: t('common.confirm.label'),
              onPress: () => {
                props.onPress && props.onPress();
                setShowConfirmDialog(false);
              },
              type: 'danger',
            },
          ]}
        />
      )}
    </>
  );
};
