import React, { useState } from 'react';
import { StyleSheet, Animated, LayoutAnimation, View } from 'react-native';
import SpacingView from '../../../components/basic/SpacingView';
import TicketCard from '../../../components/TicketCard/TicketCard';

// 模拟数据
const mockTickets = [
  {
    id: '1',
    trainNumber: 'G123',
    departure: '北京南',
    arrival: '上海虹桥',
    time: '08:00 - 12:30',
    seat: '二等座 08车12F',
    passenger: '张三',
    status: '已检票',
  },
  {
    id: '2',
    trainNumber: 'G123',
    departure: '北京南',
    arrival: '上海虹桥',
    time: '08:00 - 12:30',
    seat: '二等座 08车12F',
    passenger: '张三',
    status: '已检票',
  },
  {
    id: '3',
    trainNumber: 'G123',
    departure: '北京南',
    arrival: '上海虹桥',
    time: '08:00 - 12:30',
    seat: '二等座 08车12F',
    passenger: '张三',
    status: '已检票',
  },
  // ...可以继续添加更多测试数据
];

export const TicketCardScreen = () => {
  return (
    <SpacingView>
      <TicketCard />
    </SpacingView>
  );
};

const TicketCardAnim = () => {
  return <TicketCard />;
};

// const styles = StyleSheet.create({
//   cardContainer: {
//     borderRadius: 12,
//     marginBottom: -40, // 实现堆叠效果
//     overflow: 'hidden',
//   },
// });
