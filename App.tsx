import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import GameStackNavigator from './src/navigators/GameStackNavigator';

function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  });

  return (
    <NavigationContainer>
      {showSplash ? (
        <SplashScreen />
      ) : !isLogin ? (
        <LoginScreen isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <GameStackNavigator />
      )}
    </NavigationContainer>
  );
}

export default App;
