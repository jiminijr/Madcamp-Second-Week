import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';

import EnterGameScreen from '../screens/EnterGameScreen';
import WaitGameScreen from '../screens/WaitGameScreen';
import GameLobbyScreen from '../screens/GameLobbyScreen';
import DoingGameScreen from '../screens/DoingGameScreen';
import {Profile} from '../../App';

export type GameStackParamList = {
  EnterGame: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: string;
  };
  WaitGame: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: string;
  };
  GameLobby: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: string;
  };
  DoingGame: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: string;
    socket: any;
  };
};

type Props = {
  token: string;
  profile: Profile;
};

const Stack = createStackNavigator<GameStackParamList>();

const GameStackNavigator: FC<Props> = ({token, profile}) => {
  const [isWaitGameScreen, setShowWaitGame] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWaitGame(false);
    }, 2000);
  }, []);

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="DoingGame"
        component={DoingGameScreen}
        options={{headerShown: false}}
        initialParams={{profile: profile, token: token}}
      /> */}
      <Stack.Screen
        name="EnterGame"
        component={EnterGameScreen}
        options={{headerShown: false}}
        initialParams={{profile: profile, token: token}}
      />
      <Stack.Screen
        name="WaitGame"
        component={WaitGameScreen}
        options={{headerShown: false}}
        initialParams={{profile: profile, token: token}}
      />
      <Stack.Screen
        name="GameLobby"
        component={GameLobbyScreen}
        options={{headerShown: false}}
        initialParams={{profile: profile, token: token}}
      />
      <Stack.Screen
        name="DoingGame"
        component={DoingGameScreen}
        options={{headerShown: false}}
        initialParams={{profile: profile, token: token}}
      />
    </Stack.Navigator>
  );
};

export default GameStackNavigator;
