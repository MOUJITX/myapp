import React from 'react';
import FilePicker from './components/basic/FilePicker';
import { types } from '@react-native-documents/picker';
import Button from './components/basic/Button';
import { Text } from 'react-native';
import SpacingView from './components/basic/SpacingView';
import { useDispatch } from 'react-redux';
import { restoreAction } from './store/userProfile/userProfile.redux';

export const PageB = () => {
  const [fileContent, setFileContent] = React.useState('');
  const dispatch = useDispatch();
  return (
    <>
      <FilePicker
        onFileRead={file => {
          setFileContent(file);
          dispatch(restoreAction(file));
        }}
        onFileInfo={info => console.log(info)}
        fileTypes={[types.json, types.plainText]}
      >
        <Button label="Open File" />
      </FilePicker>
      <SpacingView>
        <Text>{fileContent}</Text>
      </SpacingView>
    </>
  );
};
