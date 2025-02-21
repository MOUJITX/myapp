import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import TicketCard from '../../../components/TicketCard/TicketCard';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import SpacingView from '../../../components/basic/SpacingView';
import HoverButton from '../../../components/basic/HoverButton';
import { TicketCardAddScreen } from '../ticketCardAddScreen.tsx/ticketCardAddScreen';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';

const TicketCardAnim = ({
  index,
  ticket,
  onPress,
  isOpen,
  topCard,
}: {
  index: number;
  ticket: TrainTicket;
  onPress: () => void;
  isOpen: boolean;
  topCard: number;
}) => {
  const openCardHeadHeight = isOpen ? 28 : 63;
  const openMoveHeight = Dimensions.get('window').height * 0.55;

  const translateY = useSharedValue(0);
  const height = useSharedValue(openCardHeadHeight);

  useEffect(() => {
    height.value = withTiming(openCardHeadHeight);

    if (isOpen) {
      if (index > topCard) {
        translateY.value = withTiming(3 * openCardHeadHeight + openMoveHeight);
      } else if (index < topCard) {
        translateY.value = withTiming(4 * openCardHeadHeight + openMoveHeight);
      } else {
        translateY.value = withTiming(-openCardHeadHeight * index);
      }
    } else {
      translateY.value = withTiming(0);
    }
  }, [
    index,
    isOpen,
    topCard,
    openCardHeadHeight,
    openMoveHeight,
    height,
    translateY,
  ]);

  const cardStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={isOpen ? 1 : 0.8}>
      <Animated.View style={[cardStyle]}>
        <TicketCard ticket={ticket} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const TicketCardScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topCard, setTopCard] = useState(0);

  const AddScreenBottomSheetRef = useRef<BottomSheetRef>(null);

  const handleCardPress = (index: any) => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setTopCard(index);
    }
  };

  return (
    <View style={styles.container}>
      <SpacingView>
        {[].map((ticket, index) => (
          <TicketCardAnim
            key={index}
            index={index}
            ticket={ticket}
            onPress={() => handleCardPress(index)}
            isOpen={isOpen}
            topCard={topCard}
          />
        ))}
      </SpacingView>

      <HoverButton
        label="+"
        onPress={() => AddScreenBottomSheetRef.current?.openBottomSheet()}
      />

      <BottomSheet ref={AddScreenBottomSheetRef}>
        <TicketCardAddScreen />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
