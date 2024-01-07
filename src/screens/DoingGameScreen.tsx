import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, ScrollView, Image, StyleSheet, Text, Animated } from 'react-native';
import problems from '../problems/problem.json';

const DoingGameScreen = () => {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [gameStart, setGameStart] = useState(true);
  const [correct, setCorrect] = useState(true);
  const [tensec, settensec] = useState(false);
  const moveAnimation = useRef(new Animated.Value(0)).current; // 애니메이션 state
  const [currentProblem, setCurrentProblem] = useState('');
  

  const handleSendMessage = () => {
    if (chat.trim()) {
      setMessages([...messages, chat]);
      setChat(''); // 입력 필드 초기화
    }
  };
  
  useEffect(() => {
    if (gameStart) {
      // gameStart가 true일 때 애니메이션 시작
      Animated.timing(
        moveAnimation,
        {
          toValue: -200, // 이동할 거리
          duration: 10000, // 애니메이션 지속 시간
          useNativeDriver: true,
        }
      ).start();
    } else {
      // gameStart가 false일 때 애니메이션 중단
      moveAnimation.stopAnimation();
      moveAnimation.setValue(0); // 애니메이션 초기 위치로 재설정
    }
  }, [gameStart, moveAnimation]);

  useEffect(() => {
    if (correct) {
      setTimeout(() => {
        setCorrect(false);
      }, 1000); // 1초 후에 correct를 false로 설정
    }
  }, [correct]);

  useEffect(() => {
    if (tensec) {
      setTimeout(() => {
        settensec(false);
      }, 1000); // 1초 후에 correct를 false로 설정
    }
  }, [correct]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ translateX: moveAnimation }] }]}>
        {/* gameStart 상태에 따라 이미지 변경 */}
        <Image 
          source={gameStart 
                    ? require('../../assets/images/movingmyohan.gif') 
                    : require('../../assets/images/myohan.png')} 
          style={styles.myohanImage} />
      </Animated.View>

      {correct && (
        <View style={styles.correctModal}>
          <Image
            source={require('../../assets/images/okey.gif')}
            style={styles.correctImage}
          />
        </View>
      )}
      {tensec && (
        <View style={styles.tensecModal}>
          <Image
            source={require('../../assets/images/10sec.gif')}
            style={styles.tensecImage}
          />
        </View>
      )}


      {/* 상단 검은색 창 */}
      <View style={styles.blackBox}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/kaseoyugi.png')}
            style={styles.blackBoxImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.blackBoxText}>지민최고</Text>
        </View>
      </View>
      
      {/* 하단 채팅창 */}
      <ScrollView style={styles.chatMessages}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.chatText}>{message}</Text>
        ))}
        {/* 여기에 세로로 글씨를 나열 */}


      </ScrollView>
      
        <TextInput
          style={styles.textInput}
          value={chat}
          onChangeText={setChat}
          placeholder="메시지를 입력하세요"
          onSubmitEditing={handleSendMessage}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 212, 0, 1)', // 배경색 설정
  },
  animatedContainer: {
    position: 'absolute',
    top: 0,
    right: 50, 
  },
  myohanImage: {
    width: 50,
    height: 50,
  },
  correctModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 1, // 다른 컴포넌트 위에 표시
  },
  correctImage: {
    width: 200,
    height: 200,
  },
  tensecModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 1, // 다른 컴포넌트 위에 표시
  },
  tensecImage: {
    width: 200,
    height: 200,
  },
    blackBox: {
        backgroundColor: 'black',
        marginTop: 50,
        alignSelf: 'center',
        width: 272,
        height: 153,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
      },
      imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      blackBoxImage: {
        width: 60,
        height: 20,
      },
      textContainer: {
        // 필요한 경우 추가 스타일링
      },
      blackBoxText: {
        color: 'white',
        fontSize: 30,
      },


  chatMessages: {
    width: 250,
    height: 5,
    backgroundColor:'rgba(0, 0, 0, 0.1)',
    marginLeft: 10,
    borderColor: '#4E3107',
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,

  },
  chatContainer: {
    flex: 1,
    
  },
  chatText: {
    // 여기에 채팅 텍스트 스타일 추가
    fontSize: 16,
    marginVertical: 3, // 글자 사이의 간격
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
  },
});

export default DoingGameScreen;