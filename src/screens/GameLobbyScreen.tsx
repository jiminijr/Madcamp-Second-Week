import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const GameLobbyScreen = () => {
  const [users, setUsers] = useState([]);

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
      source={require('../../assets/images/background.png')} // 배경 이미지 URL
      style={styles.backgroundImage}
    >
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
      />
    <FastImage
        source={require('../../assets/images/game_lobby.gif')}
        style={styles.gifImage}
      />

      <TouchableOpacity onPress={() => {/* 게임 시작 로직 */}}>
        <Image
          source={require('../../assets/images/gamestart.png')} // 버튼 이미지 URL
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <Text style={styles.buttonText}>게임 시작</Text> 

      <TouchableOpacity onPress={() => {/* 게임 변경 로직 */}}>
        <Image
          source={require('../../assets/images/gamechange.png')} // 다른 버튼 이미지 URL
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <Text style={styles.buttonText}>게임 변경</Text> 
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
  // 추가 스타일링이 필요한 경우 여기에 추가
});

export default GameLobbyScreen;
