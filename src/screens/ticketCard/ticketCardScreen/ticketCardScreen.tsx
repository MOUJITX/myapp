// import { FlashList } from '@shopify/flash-list';
import { t } from 'i18next';
import { useLayoutEffect, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Button, { ButtonShapeType } from '../../../components/basic/Button';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView, {
  SpacingViewRef,
} from '../../../components/basic/SpacingView';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';
import { commonStyles } from '../../../styles';

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
              pressConfirm={{
                title: t('common.delete.confirm.title'),
                description: t('common.delete.confirm.description'),
              }}
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
    output: { trainTicketRemove, gotoTicketAddScreen },
  } = useTicketCardHook();

  const [isOpen, setIsOpen] = useState(false);
  const [topCard, setTopCard] = useState<string>();
  const [trainTicketsList, setTrainTicketsList] = useState<TrainTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ticketCardListRef = useRef<SpacingViewRef>(null);

  const handleCardPress = (uuid: string) => {
    if (isOpen) {
      setIsOpen(false);
      ticketCardListRef.current?.scrollTo(0);
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

  useLayoutEffect(() => {
    setTimeout(() => {
      setTrainTicketsList(trainTickets);
      setIsLoading(false);
    }, 0);
  }, [trainTickets]);

  return (
    <>
      {isLoading ? (
        <View style={[styles.container, styles.containerCenter]}>
          <Text>{t('common.loading.label')}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SpacingView ref={ticketCardListRef} notAutoEnd>
            {trainTicketsList.map((ticket, index) => (
              <TicketCardAnim
                key={index}
                index={index}
                ticket={ticket}
                onPress={() => handleCardPress(ticket.uuid)}
                isOpen={isOpen}
                topCard={topCard}
                topCardIndex={trainTicketsList.findIndex(
                  tt => tt.uuid === topCard,
                )}
                removeAction={handleRemoveAction}
                editAction={() => gotoTicketAddScreen(ticket)}
              />
            ))}
          </SpacingView>

          <HoverButton
            label={t('common.add.icon')}
            onPress={() => gotoTicketAddScreen()}
          />
        </View>
      )}
    </>
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
  containerCenter: { alignItems: 'center', justifyContent: 'center' },
});
