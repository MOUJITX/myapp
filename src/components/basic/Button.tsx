import { t } from 'i18next';
import { TouchableOpacity } from 'react-native';

import Tag from './Tag';
import { Props as TipProps } from './Tag';

export enum ButtonShapeType {
  Default = 'default',
  Circle = 'circle',
  Square = 'square',
  NoRadius = 'noRadius',
}

export interface Props extends TipProps {
  onPress?: () => void;
}

export default (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Tag {...props} label={props.label ?? t('component.button.label')} />
    </TouchableOpacity>
  );
};
