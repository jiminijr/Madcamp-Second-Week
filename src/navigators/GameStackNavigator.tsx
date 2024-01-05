import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EnterGameScreen from '../screens/EnterGameScreen';

export type GameStackParamList = {
  EnterGame: undefined;
};

const Stack = createStackNavigator<GameStackParamList>();

const GameStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnterGame"
        component={EnterGameScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default GameStackNavigator;
