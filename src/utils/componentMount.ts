import { EffectCallback, useEffect } from 'react';

//Only run once when component mounts
export const useComponentMount = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};
