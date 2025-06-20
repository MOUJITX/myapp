import { DocumentPickerResponse, pick } from '@react-native-documents/picker';
import { View } from 'react-native';
import RNFS from 'react-native-fs';

interface Props {
  children: React.ReactNode;
  fileTypes?: string[];
  onFileRead?: (content: string) => void;
  onFileInfo?: (info: DocumentPickerResponse) => void;
}

export default (props: Props) => {
  const handleFilePick = async () => {
    try {
      const [res] = await pick({
        mode: 'import',
        allowMultiSelection: false,
        type: props.fileTypes,
      });
      //   console.log(res);
      if (res.uri) {
        const fileContent = await RNFS.readFile(res.uri, 'utf8');
        props.onFileRead && props.onFileRead(fileContent);
        props.onFileInfo && props.onFileInfo(res);
      }
    } catch (err) {
      console.error('File pick error:', err);
    }
  };

  return <View onTouchEnd={handleFilePick}>{props.children}</View>;
};
