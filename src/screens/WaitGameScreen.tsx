import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GameStackParamList,  } from '../navigators/GameStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

type Props = StackScreenProps<GameStackParamList, 'WaitGame'>

const WaitGameScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('GameLobby'); // GameLobbyScreen으로 이동
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../assets/images/game_lobby.gif')}
        style={styles.gifImage}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd400',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },
  gifImage: {
    width: 300,
    height: 300,
  },
});

export default WaitGameScreen;
