import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { commonStyles } from '../../../styles';
import SpacingView from '../../../components/basic/SpacingView';
import { autoFontSize } from '../../../utils/autoSize';
import HoverButton from '../../../components/basic/HoverButton';

export const TicketCardScreen = () => {
  const [expandedId, setExpandedId] = useState<number | undefined>(undefined);

  const handleCardPress = (id: number) => {
    setExpandedId(expandedId === id ? undefined : id);
  };

  return (
    <View style={styles.container}>
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

      <HoverButton label="+" />
    </View>
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
  container: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: autoFontSize(12),
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
});
