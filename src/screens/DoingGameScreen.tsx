import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Animated,
  ImageBackground,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = StackScreenProps<GameStackParamList, 'DoingGame'>;

const DoingGameScreen = () => {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [tensec, settensec] = useState(false);
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const initialGameTitle = route.params?.gameTitle;
  const inviteCode = route.params?.inviteCode;
  const moveAnimation = useRef(new Animated.Value(0)).current; // 애니메이션 state
  const progressBarAnimation = useRef(new Animated.Value(0)).current;
  const [currentProblem, setCurrentProblem] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const problems = require('../problems/problem.json');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const profile = route.params.profile;
  const [gameTitle, setGameTitle] = useState<string>(initialGameTitle);
  const [userScores, setUserScores] = useState({});
  const [progressBarColor, setProgressBarColor] = useState('#FEFAE1');
  const [currentCountdownNumber, setCurrentCountdownNumber] = useState(3);
  const [gameStage, setGameStage] = useState('gameInstruction'); // 'gameInstruction', 'countdown', 'inGame'

  const initializeGame = () => {
    // 문제 목록 초기화
    const randomproblems = problems
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
    setSelectedProblems(randomproblems);

    // 필요한 다른 초기화 작업 수행
    setCurrentProblemIndex(0);
    setUserScores({});

    // 첫 번째 문제 설정
    if (randomproblems.length > 0) {
      setCurrentProblem(randomproblems[0].problem);
      setCurrentAnswer(randomproblems[0].answer);
    }
  };

  //   // 7초 후에 깜빡이는 효과 시작
  //   const colorChangeTimeout = setTimeout(() => {
  //     const blinkInterval = setInterval(() => {
  //       setProgressBarColor(prevColor =>
  //         prevColor === 'red' ? '#FEFAE1' : 'red',
  //       );
  //     }, 500); // 0.5초 간격으로 색상 변경
  //     setTimeout(() => {
  //       clearInterval(blinkInterval);
  //     }, 5000);
  //   }, 5000);
  let colorChangeTimeout;
  let blinkIntervalId;

  useEffect(() => {
    if (gameStage === 'gameInstruction') {
      setTimeout(() => {
        setGameStage('countdown');
      }, 5000);
    } else if (gameStage === 'countdown' && currentCountdownNumber > 0) {
      // 카운트다운 로직
      const timer = setTimeout(() => {
        setCurrentCountdownNumber(currentCountdownNumber - 1);
        console.log(currentCountdownNumber);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (gameStage === 'countdown' && currentCountdownNumber === 0) {
      // 카운트다운 종료 후 게임 시작
      setGameStage('inGame');
      initializeGame();
    }

    if (
      gameStage === 'inGame' &&
      currentProblemIndex < selectedProblems.length
    ) {
      console.log({currentProblemIndex});
      setCurrentProblem(selectedProblems[currentProblemIndex].problem);
      setCurrentAnswer(selectedProblems[currentProblemIndex].answer);
      moveAnimation.setValue(0);
      Animated.timing(moveAnimation, {
        toValue: -270, // 이동할 거리
        duration: 10000, // 애니메이션 지속 시간
        useNativeDriver: true,
      }).start();
      progressBarAnimation.setValue(0);
      setProgressBarColor('#FEFAE1');
      Animated.timing(progressBarAnimation, {
        toValue: 1, // 최대값 1로 설정
        duration: 10100, // 9초 동안 애니메이션 진행
        useNativeDriver: false, // 레이아웃 애니메이션을 위해 false로 설정
      }).start();

      // 깜빡임 효과 시작
      colorChangeTimeout = setTimeout(() => {
        blinkIntervalId = setInterval(() => {
          setProgressBarColor(prevColor =>
            prevColor === 'red' ? '#FEFAE1' : 'red',
          );
        }, 500);

        // 5초 후에 인터벌 정리
        setTimeout(() => clearInterval(blinkIntervalId), 5000);
      }, 5000);

      const timeout = setTimeout(() => {
        progressBarAnimation.setValue(0);
        setCurrentProblemIndex(currentProblemIndex + 1);
        settensec(true);
      }, 10100);
      return () => {
        // 컴포넌트 언마운트 시 타이머 정리
        clearInterval(timeout);
        if (colorChangeTimeout) clearTimeout(colorChangeTimeout);
        if (blinkIntervalId) clearInterval(blinkIntervalId);
      };
    } else if (
      gameStage === 'inGame' &&
      currentProblemIndex == selectedProblems.length
    ) {
      navigation.replace('EndingGame', {
        gameTitle: gameTitle,
        inviteCode: inviteCode,
      });
    }
  }, [
    gameStage,
    currentCountdownNumber,
    currentProblemIndex,
    selectedProblems,
  ]);

  const getCountdownImage = number => {
    switch (number) {
      case 3:
        return require('../../assets/images/num3.gif');
      case 2:
        return require('../../assets/images/num2.gif');
      case 1:
        return require('../../assets/images/num1.gif');
      default:
        return null;
    }
  };

  const progressBarStyle = {
    // position: 'absolute',
    height: 12,
    backgroundColor: progressBarColor,
    width: progressBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['90%', '0%'], // 0에서 100%로 너비 변경
    }),
  };

  const handleSendMessage = () => {
    if (chat.trim()) {
      // 새로운 메시지 객체 생성
      const newMessage = {
        text: chat,
        sender: profile.nickname, // 사용자 이름 추가
      };

      // 메시지 배열에 새 메시지 추가
      setMessages([...messages, newMessage]);

      // 현재 문제의 정답과 사용자 입력이 일치하는지 검사
      if (chat.trim() === currentAnswer) {
        // 정답인 경우 다음 문제로 넘어감
        setCorrect(true);
        console.log(setCorrect);
        setCurrentProblemIndex(currentProblemIndex + 1);

        const newScore = (userScores[profile.nickname] || 0) + 1;
        setUserScores({...userScores, [profile.nickname]: newScore});
      }
      setChat(''); // 입력 필드 초기화
    }
  };

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
  }, [tensec]);

  return (
    <View style={styles.container}>
      <View style={styles.blackBox}>
        <View style={styles.topBar}>
          <Image
            source={require('../../assets/images/kaseougi.png')}
            style={styles.blackBoxImage}
          />
          <View style={styles.progressBar}>
            <Animated.View style={progressBarStyle}></Animated.View>
            <Animated.View style={[styles.animatedContainer]}>
              <Image
                source={require('../../assets/images/movingmyohan.gif')}
                style={styles.myohanImage}
              />
            </Animated.View>
          </View>
        </View>
        <View style={styles.textContainer}>
          {gameStage === 'gameInstruction' && (
            <Text style={styles.instructionText}>
              10초 내에 빈칸에 들어갈 말을 전송하세요.{'\n'} 선착순!
            </Text>
          )}
          {gameStage === 'countdown' && currentCountdownNumber > 0 && (
            <Image
              source={getCountdownImage(currentCountdownNumber)}
              style={styles.countdownImage}
            />
          )}
          {gameStage === 'inGame' && (
            <Text style={styles.blackBoxText}>{currentProblem}</Text>
          )}
        </View>
        <View style={styles.score}>
          <Text style={styles.scoreText}>안녕</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* 하단 채팅창 */}
        <ScrollView style={styles.chatMessages}>
          {messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.chatText}>
                {message.sender}: {message.text}
              </Text>
            </View>
          ))}
          {/* 여기에 세로로 글씨를 나열 */}
        </ScrollView>
      </View>

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

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={chat}
          onChangeText={setChat}
          placeholder="메시지를 입력하세요"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => handleSendMessage()}>
          <Text style={styles.sendBtnText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 212, 0, 1)', // 배경색 설정
  },
  animatedContainer: {
    // position: 'absolute',
    top: 0,
    right: 0,
  },
  myohanImage: {
    width: 32,
    height: 32,
    marginLeft: -20,
  },
  correctModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -100}, {translateY: -100}],
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
    transform: [{translateX: -100}, {translateY: -100}],
    zIndex: 1, // 다른 컴포넌트 위에 표시
  },
  tensecImage: {
    width: 200,
    height: 200,
  },
  blackBox: {
    backgroundColor: 'black',
    // alignSelf: 'center',
    width: '100%',
    height: 220,
    paddingVertical: 8,
    // justifyContent: 'center',
  },
  blackBoxImage: {
    // position: 'absolute',
    // top: '5%',
    left: 0,
    width: 100,
    height: 30,
  },
  topBar: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  instructionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  countdownImage: {
    position: 'absolute',
    width: '30%',
    height: '60%',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // 필요한 경우 추가 스타일링
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  scoreText: {
    color: 'white',
  },
  blackBoxText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  chatMessages: {
    width: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
  },
  chatContainer: {
    flex: 1,
  },
  chatText: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 4,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    fontFamily: 'baemin',
    backgroundColor: 'white',
    padding: 10,
  },
  sendBtn: {
    flex: 1,
    width: 80,
    borderWidth: 1,
    backgroundColor: '#FEFAE1',
    borderColor: 'gray',
  },
  sendBtnText: {
    fontSize: 20,
    fontFamily: 'baemin',
    marginTop: 12,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default DoingGameScreen;
