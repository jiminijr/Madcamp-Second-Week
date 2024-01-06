import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, StackNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/GameStackNavigator';

type Props = {
  route: RouteProp<RootStackParamList, 'WaitGame'>;
};

const WaitGameScreen = ({ route }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('GameLobby'); // GameLobbyScreen으로 이동
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임 준비 중...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // 추가 스타일링
});

export default WaitGameScreen;
