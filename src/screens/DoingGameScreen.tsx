import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

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
  const [users, setUsers] = useState([]);
  const [gameTitle, setGameTitle] = useState<string>(initialGameTitle);

  useEffect(() => {
    // 문제 목록 초기화
    const randomproblems = problems
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setSelectedProblems(randomproblems);
  }, []);

  useEffect(() => {
    if (currentProblemIndex < selectedProblems.length) {
      console.log({selectedProblems});
      console.log({currentProblemIndex});
      setCurrentProblem(selectedProblems[currentProblemIndex].problem);
      setCurrentAnswer(selectedProblems[currentProblemIndex].answer);
      moveAnimation.setValue(0);
      Animated.timing(moveAnimation, {
        toValue: -200, // 이동할 거리
        duration: 9000, // 애니메이션 지속 시간
        useNativeDriver: true,
      }).start();
      progressBarAnimation.setValue(0);
      Animated.timing(progressBarAnimation, {
        toValue: 1, // 최대값 1로 설정
        duration: 9000, // 9초 동안 애니메이션 진행
        useNativeDriver: false, // 레이아웃 애니메이션을 위해 false로 설정
      }).start();

      const timeout = setTimeout(() => {
        setCurrentProblemIndex(currentProblemIndex + 1);
        settensec(true);
      }, 10000);
      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [currentProblemIndex, selectedProblems]);

  const progressBarStyle = {
    height: 10,
    backgroundColor: 'blue',
    width: progressBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%'], // 0에서 100%로 너비 변경
    }),
  };

  const handleSendMessage = () => {
    if (chat.trim()) {
      setMessages([...messages, chat]);

      // 현재 문제의 정답과 사용자 입력이 일치하는지 검사
      if (chat.trim() === currentAnswer) {
        // 정답인 경우 다음 문제로 넘어감
        setCorrect(true);
        moveAnimation.setValue(0);
        setCurrentProblemIndex(currentProblemIndex + 1);
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
      <Animated.View
        style={[
          styles.animatedContainer,
          {transform: [{translateX: moveAnimation}]},
        ]}>
        <Image
          source={require('../../assets/images/movingmyohan.gif')}
          style={styles.myohanImage}
        />
      </Animated.View>

      <Animated.View style={progressBarStyle} />

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
            source={require('../../assets/images/kaseougi.png')}
            style={styles.blackBoxImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.blackBoxText}>{currentProblem}</Text>
        </View>
      </View>

      {/* 하단 채팅창 */}
      <ScrollView style={styles.chatMessages}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.chatText}>
            {message}
          </Text>
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
    marginTop: 50,
    alignSelf: 'center',
    width: 272,
    height: 153,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
