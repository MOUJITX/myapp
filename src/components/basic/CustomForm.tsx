import React, { useState } from 'react';
import SpacingView from './SpacingView';
import CellGroup from './CellGroup';
import TextInput from './TextInput';
import Button from './Button';
import { t } from 'i18next';
import { useComponentMount } from '../../utils/componentMount';
import Switch from './Switch';
import TextInputCustom from './TextInputCustom';

export interface CustomFormField {
  key: string;
  label: string;
  type?: 'text' | 'idCard' | 'switch';
  inline?: boolean;
  placeholder?: string;
}

interface Props {
  fields: CustomFormField[];
  form?: any;
  formLabel?: string;
  onValueChange?: (form: any) => void;
  onFormLabelChange?: (string: any) => void;
}

export default (props: Props) => {
  const [customForm, setCustomForm] = useState<Record<string, string>>();
  const [formLabel, setFormLabel] = useState<string>();

  const replaceFormLabel = (
    formData: Record<string, string>,
    label?: string,
  ) => {
    if (label) {
      const newFormLabel = label.replace(
        /\$(\w+)/g,
        (_, key) => formData[key] || '',
      );
      setFormLabel(newFormLabel);
      props.onFormLabelChange && props.onFormLabelChange(newFormLabel);
    }
  };

  const handleCustomFieldUpdate = (key: string, value: string) => {
    setCustomForm(prev => {
      const newForm = { ...prev, [key]: value };
      replaceFormLabel(newForm, props.formLabel);
      return newForm;
    });
  };

  useComponentMount(() => {
    const initCustomForm = props.fields.reduce(
      (acc, cur) => {
        acc[cur.key] = props.form?.[cur.key] ?? '';
        return acc;
      },
      {} as Record<string, string>,
    );
    setCustomForm(initCustomForm);
    replaceFormLabel(initCustomForm, props.formLabel);
  });

  return (
    <SpacingView>
      <CellGroup card title={formLabel}>
        {props.fields.map((field, index) => {
          if (field.type === 'text') {
            return (
              <TextInput
                key={index}
                inline={field.inline}
                label={field.label}
                value={customForm?.[field.key]}
                onValueChange={value =>
                  handleCustomFieldUpdate(field.key, value)
                }
              />
            );
          }

          if (field.type === 'idCard') {
            return (
              <TextInputCustom
                key={index}
                inline={field.inline}
                label={field.label}
                value={customForm?.[field.key]}
                keyboardType={'idCard'}
                onValueChange={value =>
                  handleCustomFieldUpdate(field.key, value)
                }
              />
            );
          }

          if (field.type === 'switch') {
            return (
              <Switch
                key={index}
                inline={field.inline}
                label={field.label}
                value={customForm?.[field.key].toString() === 'true'}
                onValueChange={value =>
                  handleCustomFieldUpdate(field.key, value ? 'true' : 'false')
                }
              />
            );
          }

          return <></>;
        })}
      </CellGroup>
      <Button
        label={t('common.save.label')}
        type="primary"
        onPress={() => {
          props.onValueChange && props.onValueChange(customForm);
        }}
      />
    </SpacingView>
  );
};
