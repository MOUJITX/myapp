import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLoginHook } from './loginHook';
import TextInput from '../../../components/basic/TextInput';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import TextLabel from '../../../components/basic/TextLabel';
import { languageCode, languageTag } from '../../../i18n/i18n';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const {} = useLoginHook();

  return (
    <View>
      <ScrollView>
        <Text>{t('userProfile.login.title')}</Text>
        <CellGroup card>
          <TextInput
            label="短文本输入框"
            inline
            required
            placeholder="default"
            onValueChange={v => console.log(v)}
          />
          <TextInput
            label="长文本输入框"
            textLines={3}
            onValueChange={v => console.log(v)}
          />
        </CellGroup>
        <CellGroup>
          <TextInput
            label="短文本输入框"
            inline
            required
            placeholder="default"
            onValueChange={v => console.log(v)}
          />
          <TextInput
            label="长文本输入框"
            textLines={2}
            onValueChange={v => console.log(v)}
          />
          <DatetimePicker
            label="日期选择器"
            inline
            onValueChange={v => console.log(v)}
          />
          <DatetimePicker
            label="timePicker"
            mode="time"
            onValueChange={v => console.log(v)}
          />
          <TextLabel label="文本标签" value="文本标签" />
          <TextLabel label="languageTag" value={languageTag} inline />
          <TextLabel label="languageCode" value={languageCode} inline />
        </CellGroup>
      </ScrollView>
    </View>
  );
};
