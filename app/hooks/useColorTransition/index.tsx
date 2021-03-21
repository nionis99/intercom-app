import { Animated, Easing } from 'react-native';
import { useCallback, useRef } from 'react';

const useColorTransition = (transitionStatement: boolean, initialColor: string, colorTo: string) => {
  const animatedColorController = useRef(new Animated.Value(0)).current;

  const borderColorAnimated = animatedColorController.interpolate({
    inputRange: [0, 1],
    outputRange: [initialColor, colorTo],
  });

  const handleColorChange = useCallback(
    () =>
      Animated.timing(animatedColorController, {
        duration: 300,
        toValue: transitionStatement ? 1 : 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start(),
    [animatedColorController, transitionStatement]
  );

  return { borderColorAnimated, handleColorChange };
};

export default useColorTransition;
