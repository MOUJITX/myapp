import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import TicketCard from './components/TicketCard/TicketCard';
import SpacingView from './components/basic/SpacingView';

const Card = ({
  index,
  onPress,
  isOpen,
  topCard,
}: {
  index: number;
  onPress: () => void;
  isOpen: boolean;
  topCard: number;
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      if (index > topCard) {
        translateY.value = withTiming(150 + 200);
      } else if (index < topCard) {
        translateY.value = withTiming(200 + 200);
      } else {
        translateY.value = withTiming(-50 * index);
      }
    } else {
      translateY.value = withTiming(0);
    }
  }, [index, isOpen, topCard, translateY]);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={isOpen ? 1 : 0.8}>
      <Animated.View style={[styles.card, cardStyle]}>
        <TicketCard />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const PageC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [topCard, setTopCard] = useState(0);

  const handleCardPress = (index: any) => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setTopCard(index);
    }
  };

  return (
    <SpacingView>
      {[0, 1, 2, 3, 4, 5, 6].map(index => (
        <Card
          key={index}
          index={index}
          onPress={() => handleCardPress(index)}
          isOpen={isOpen}
          topCard={topCard}
        />
      ))}
    </SpacingView>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 50,
  },
});
