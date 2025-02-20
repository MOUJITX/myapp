import React, { useState } from 'react';
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
      {[1, 2, 3, 4].map((ticket, index) => (
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

const TicketCardAnim = ({ ticket, isExpanded, onPress }: any) => {
  const heightAnim = React.useRef(new Animated.Value(0)).current;
  const marginAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 230 : 104,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(marginAnim, {
        toValue: isExpanded ? 0 : -40,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [heightAnim, isExpanded, marginAnim]);

  return (
    <Animated.View
      style={[
        {
          height: heightAnim,
          marginBottom: marginAnim,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.cardContainer}
      >
        <TicketCard />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: autoFontSize(12),
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
});
