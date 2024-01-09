import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EnterGameScreen from '../screens/EnterGameScreen';
import DoingGameScreen from '../screens/DoingGameScreen';
import EndingGameScreen from '../screens/EndingGameScreen';


export type GameStackParamList = {
  EnterGame: undefined;
  DoingGame: undefined;
  Gameover: undefined;
  EndingGame: undefined;
};

const Stack = createStackNavigator<GameStackParamList>();

const GameStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoingGame"
        component={DoingGameScreen}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};

export default GameStackNavigator;
