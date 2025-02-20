import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { commonStyles } from '../../../styles';
import SpacingView from '../../../components/basic/SpacingView';
import { autoFontSize } from '../../../utils/autoSize';

export const TicketCardScreen = () => {
  const [expandedId, setExpandedId] = useState<number | undefined>(undefined);

  const handleCardPress = (id: number) => {
    setExpandedId(expandedId === id ? undefined : id);
  };

  return (
    <SpacingView>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ticket, index) => (
        <TicketCardAnim
          key={index}
          ticket={ticket}
          isExpanded={expandedId === index}
          onPress={() => handleCardPress(index)}
        />
      ))}
    </SpacingView>
  );
};

const TicketCardAnim = ({ _ticket, isExpanded, onPress }: any) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? autoFontSize(210) : autoFontSize(100),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(marginAnim, {
        toValue: isExpanded ? 10 : -35,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [heightAnim, isExpanded, marginAnim]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            height: heightAnim,
            marginBottom: marginAnim,
          },
        ]}
      >
        <TicketCard />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: autoFontSize(12),
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
});
