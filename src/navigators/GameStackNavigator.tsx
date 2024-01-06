import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import EnterGameScreen from '../screens/EnterGameScreen';
import WaitGameScreen from '../screens/WaitGameScreen';
import GameLobbyScreen from '../screens/GameLobbyScreen';

export type GameStackParamList = {
  EnterGame: undefined;
  WaitGame: { gameTitle: string };
};

const Stack = createStackNavigator<GameStackParamList>();

const GameStackNavigator = () => {
  const [isWaitGameScreen, setShowWaitGame] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWaitGame(false);
    }, 2000);
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnterGame"
        component={EnterGameScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WaitGame"
        component={WaitGameScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameLobby"
        component={GameLobbyScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default GameStackNavigator;


