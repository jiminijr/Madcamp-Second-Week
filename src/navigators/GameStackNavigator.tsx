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
    inviteCode: String;
  };
  WaitGame: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: String;
  };
  GameLobby: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: String;
  };
  DoingGame: {
    profile: Profile;
    token: string;
    gameTitle: string;
    inviteCode: String;
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
