// import { FlashList } from '@shopify/flash-list';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import Button, { ButtonShapeType } from '../../../components/basic/Button';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView, {
  SpacingViewRef,
} from '../../../components/basic/SpacingView';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';
import { commonStyles } from '../../../styles';
import { TicketCardAddScreen } from '../ticketCardAddScreen/ticketCardAddScreen';

import { useTicketCardHook } from './ticketCardHook';

const TicketCardAnim = ({
  index,
  ticket,
  onPress,
  isOpen,
  topCard,
  topCardIndex,
  removeAction,
  editAction,
}: {
  index: number;
  ticket: TrainTicket;
  onPress: () => void;
  isOpen: boolean;
  topCard?: string;
  topCardIndex: number;
  removeAction: (id: string) => void;
  editAction: (ticket: TrainTicket) => void;
}) => {
  const openCardHeadHeight = isOpen ? 28 : 63;
  const openMoveHeight = Dimensions.get('window').height * 0.55;

  const translateY = useSharedValue(0);
  const height = useSharedValue(openCardHeadHeight);

  useEffect(() => {
    height.value = withTiming(openCardHeadHeight);

    if (isOpen) {
      if (index > topCardIndex) {
        translateY.value = withTiming(3 * openCardHeadHeight + openMoveHeight);
      } else if (index < topCardIndex) {
        translateY.value = withTiming(4 * openCardHeadHeight + openMoveHeight);
      } else {
        translateY.value = withTiming(-openCardHeadHeight * index);
      }
    } else {
      translateY.value = withTiming(0);
    }
  }, [
    height,
    index,
    isOpen,
    openCardHeadHeight,
    openMoveHeight,
    topCardIndex,
    translateY,
  ]);

  const cardStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={cardStyle}>
      <TouchableOpacity onPress={onPress} activeOpacity={isOpen ? 1 : 0.8}>
        <TicketCard ticket={ticket} />
        {isOpen && ticket.uuid === topCard && (
          <View style={styles.buttons}>
            <Button
              shape={ButtonShapeType.Circle}
              plain
              label={t('common.goto.icon')}
              type={'default'}
              onPress={() => editAction(ticket)}
            />
            <Button
              shape={ButtonShapeType.Circle}
              plain
              label={t('common.close.icon')}
              type={'danger'}
              onPress={() => removeAction(ticket.uuid)}
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export const TicketCardScreen = () => {
  const {
    input: { trainTickets },
    output: { trainTicketRemove },
  } = useTicketCardHook();

  const [isOpen, setIsOpen] = useState(false);
  const [topCard, setTopCard] = useState<string>();
  const [trainTicket, setTrainTicket] = useState<TrainTicket>();
  // const [scrollPosition, setScrollPosition] = useState(0);

  const AddScreenBottomSheetRef = useRef<BottomSheetRef>(null);

  const ticketCardListRef = useRef<SpacingViewRef>(null);

  const handleCardPress = (uuid: string) => {
    if (isOpen) {
      setIsOpen(false);
      // ticketCardListRef.current?.scrollTo(0);
    } else {
      setIsOpen(true);
      setTopCard(uuid);
      ticketCardListRef.current?.scrollTo(0);
    }
  };

  const handleRemoveAction = (id: string) => {
    trainTicketRemove(id);
    setIsOpen(false);
    setTopCard(undefined);
  };

  const handleEditAction = (ticket?: TrainTicket) => {
    setTrainTicket(ticket);
    AddScreenBottomSheetRef.current?.openBottomSheet();
  };

  return (
    <View style={styles.container}>
      <SpacingView ref={ticketCardListRef} notAutoEnd>
        {/* <FlashList
          data={trainTickets}
          renderItem={({ item, index }) => (
            <TicketCardAnim
              key={index}
              index={index}
              ticket={item}
              onPress={() => handleCardPress(item.uuid)}
              isOpen={isOpen}
              topCard={topCard}
              topCardIndex={trainTickets.findIndex(tt => tt.uuid === topCard)}
              removeAction={handleRemoveAction}
              editAction={handleEditAction}
            />
          )}
        /> */}
        {trainTickets.map((ticket, index) => (
          <TicketCardAnim
            key={index}
            index={index}
            ticket={ticket}
            onPress={() => handleCardPress(ticket.uuid)}
            isOpen={isOpen}
            topCard={topCard}
            topCardIndex={trainTickets.findIndex(tt => tt.uuid === topCard)}
            removeAction={handleRemoveAction}
            editAction={handleEditAction}
          />
        ))}
      </SpacingView>

      <HoverButton label="+" onPress={() => handleEditAction(undefined)} />

      <BottomSheet ref={AddScreenBottomSheetRef}>
        <TicketCardAddScreen
          bottomSheetRef={AddScreenBottomSheetRef}
          ticket={trainTicket}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: commonStyles.spacings.medium,
  },
  container: { flex: 1 },
});
