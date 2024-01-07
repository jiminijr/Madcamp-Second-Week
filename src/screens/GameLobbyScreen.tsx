import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GameStackParamList } from '../navigators/GameStackNavigator';

type Props = StackScreenProps<GameStackParamList, 'GameLobby'>


  const GameLobbyScreen = () => {

  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const initialGameTitle = route.params?.gameTitle;
  const profile = JSON.parse(route.params.profile);
    const [users, setUsers] = useState([]);
    const [gameSelectModalVisible, setGameSelectModalVisible] =
      useState<boolean>(false);
    const [gameTitle, setGameTitle] = useState<string>(initialGameTitle);
  
  const selectGame = (value: string) => () => {
    setGameTitle(value);
    setGameSelectModalVisible(false);
    navigation.navigate('GameLobby', { gameTitle: value });
    console.log(profile, '게임로비')
    console.log(value)
  };

  useEffect(() => {
    // 서버에서 사용자 목록을 가져오는 로직 구현
    setUsers([
        { id: '1', name: '사용자1' },
        { id: '2', name: '사용자2' },
        { id: '3', name: '사용자3' },
        { id: '4', name: '사용자4' },
        { id: '5', name: '사용자5' },
        { id: '6', name: '사용자6' },
        { id: '7', name: '사용자7' },
        { id: '8', name: '사용자8' },
    ]);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
    >
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
      />
      <Text style={styles.text}>현재 게임</Text>
      <Text style={styles.text}>{gameTitle}</Text>
      <FastImage
        source={require('../../assets/images/guitar.gif')}
        style={styles.gifImage}
      />

      <TouchableOpacity onPress={() => {/* 게임 시작 로직 */}}>
        <Image
          source={require('../../assets/images/gamestart.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <Text style={styles.buttonText}>게임 시작</Text>

      <TouchableOpacity onPress={() => { setGameSelectModalVisible(true); }}>
      <Image
          source={require('../../assets/images/gamechange.png')}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>게임 변경</Text>
      </TouchableOpacity>

      <Modal
        visible={gameSelectModalVisible}
        onRequestClose={() => {
          setGameSelectModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <Pressable
          style={styles.modalOutside}
          onPress={() => setGameSelectModalVisible(false)}
        />
        <View style={styles.selectorContainer}>
        <Pressable
            onPress={selectGame('4글자')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>4글자</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('속담')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>속담</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('인물')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>인물</Text>
          </Pressable>
          <Pressable onPress={selectGame('영화')} style={styles.selectorBtn}>
            <Text style={styles.selectorText}>영화</Text>
          </Pressable>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    backgroundColor:"white",
    alignItems: 'flex-start',
    padding:"3%"
  },
  gifImage: {
    width: 300,
    height: 300,
  },
  buttonImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
  },
  selectorContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 400,
    transform: [{translateX: -150}, {translateY: -200}],
    backgroundColor: 'black',
    borderRadius: 12,
  },
  selectorBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  selectorText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontWeight: '900',
  },
});

export default GameLobbyScreen;
