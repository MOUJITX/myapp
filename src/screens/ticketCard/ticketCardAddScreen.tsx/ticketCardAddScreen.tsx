import React from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import SpacingView from '../../../components/basic/SpacingView';
import TextInput from '../../../components/basic/TextInput';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { Text } from 'react-native';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import Switch from '../../../components/basic/Switch';
import Button from '../../../components/basic/Button';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';

export const TicketCardAddScreen = () => {
  const renderText = (text: string) => <Text>{text}</Text>;

  const renderCameraScanButton = () => (
    <ScanCameraButton codeType={'qr'} onSuccess={value => console.log(value)} />
  );
  return (
    <SpacingView>
      <TicketCard />
      <CellGroup card title="基础">
        <TextInput
          inline
          label="出发站"
          right={() => renderText('站')}
          onValueChange={() => console.log('')}
        />
        <TextInput
          inline
          label="到达站"
          right={() => renderText('站')}
          onValueChange={() => console.log('')}
        />
        <DatetimePicker
          inline
          label="出发日期"
          onValueChange={() => console.log('')}
        />
        <DatetimePicker
          inline
          label="出发时间"
          mode="time"
          onValueChange={() => console.log('')}
        />
        <TextInput inline label="车次" onValueChange={() => console.log('')} />
        <TextInput inline label="票价" onValueChange={() => console.log('')} />
        <TextInput inline label="检票" onValueChange={() => console.log('')} />
      </CellGroup>

      <CellGroup card title="标识">
        <Switch inline label="网售" onValueChange={() => console.log('')} />
        <Switch inline label="学生" onValueChange={() => console.log('')} />
        <Switch inline label="优惠" onValueChange={() => console.log('')} />
      </CellGroup>

      <CellGroup card title="座位">
        <TextInput inline label="席别" onValueChange={() => console.log('')} />
        <TextInput
          inline
          label="车厢号"
          onValueChange={() => console.log('')}
        />
        <TextInput
          inline
          label="座位号"
          onValueChange={() => console.log('')}
        />
      </CellGroup>

      <CellGroup card title="乘客信息">
        <TextInput
          inline
          label="身份证号"
          onValueChange={() => console.log('')}
        />
        <TextInput inline label="姓名" onValueChange={() => console.log('')} />
      </CellGroup>

      <CellGroup card title="更多">
        <TextInput
          inline
          label="红色编号"
          onValueChange={() => console.log('')}
        />
        <TextInput
          inline
          label="黑色编号"
          onValueChange={() => console.log('')}
        />
        <TextInput
          label="二维码信息"
          left={renderCameraScanButton}
          onValueChange={() => console.log('')}
        />
        <TextInput label="框上文字" onValueChange={() => console.log('')} />
        <TextInput label="框内文字" onValueChange={() => console.log('')} />
      </CellGroup>
      <Button label="保存" type="primary" />
    </SpacingView>
  );
};
