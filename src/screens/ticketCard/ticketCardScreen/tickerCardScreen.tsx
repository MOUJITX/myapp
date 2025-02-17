import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardPress = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {mockTickets.map((ticket, index) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          isExpanded={expandedId === ticket.id}
          onPress={() => handleCardPress(ticket.id)}
          zIndex={expandedId === ticket.id ? 100 : index + 1}
        />
      ))}
    </View>
  );
};

const TicketCard = ({ ticket, isExpanded, onPress, zIndex }: any) => {
  const heightAnim = React.useRef(
    new Animated.Value(isExpanded ? 300 : 100)
  ).current;
  const marginAnim = React.useRef(
    new Animated.Value(isExpanded ? 20 : -40)
  ).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 230 : 100,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(marginAnim, {
        toValue: isExpanded ? 20 : -40,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [heightAnim, isExpanded, marginAnim]);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          height: heightAnim,
          zIndex,
          marginBottom: marginAnim,
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {/* 卡片头部 */}
        <View style={styles.cardHeader}>
          <Text style={styles.trainNumber}>{ticket.trainNumber}</Text>
          <View style={styles.headerRight}>
            <Text style={styles.time}>{ticket.time}</Text>
            <Text style={styles.status}>{ticket.status}</Text>
          </View>
        </View>

        {/* 展开内容 */}
        {isExpanded && (
          <View style={styles.detailsContainer}>
            <InfoRow label="出发站" value={ticket.departure} />
            <InfoRow label="到达站" value={ticket.arrival} />
            <InfoRow label="座位信息" value={ticket.seat} />
            <InfoRow label="乘车人" value={ticket.passenger} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const InfoRow = ({ label, value }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: -40, // 实现堆叠效果
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  trainNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  detailsContainer: {
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    color: '#999',
    fontSize: 14,
  },
  value: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});
