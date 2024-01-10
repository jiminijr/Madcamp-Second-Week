import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Text, TextInput, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = StackScreenProps<GameStackParamList, 'DoingGame'>;

const DoingGameScreen = () => {
  const [currentProblem, setCurrentProblem] = useState('');
  const [messages, setMessages] = useState([]);
  // const [score, setScore] = useState<number>(0);

  const [chat, setChat] = useState('');

  let score = 0;
  const socketRef = useRef<any>(null);
  const route = useRoute<Props['route']>();
  const navigation = useNavigation<Props['navigation']>();
  console.log(route.params.hostId);

  const inviteCode = route.params.inviteCode;
  const gameTitle = route.params.gameTitle;
  const profile = {
    id: 3259723489,
    nickname: '이경민',
    thumbnailImageUrl:
      'https://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_110x110.jpg',
  };

  useEffect(() => {
    socketRef.current = io('http://192.249.30.240:3000/playgame');
    socketRef.current.emit('joinGame', inviteCode);
    console.log('socket', socketRef.current.id);
    if (profile.id === 3259723489) {
      console.log('aaa');
      socketRef.current.emit('initializeGame', inviteCode, gameTitle);
      console.log('initializeGame', inviteCode, gameTitle);
    }
    socketRef.current.on('initializeGame', (problem: string) => {
      setCurrentProblem(problem);
      console.log('initializeGame', problem);
    });
    socketRef.current.on(
      'chatting',
      (
        chat: {userId: number; userChat: string},
        gameChats: {userId: number; userChat: string}[],
        problem: string,
        correct: boolean,
      ) => {
        console.log('chatting', chat, gameChats, problem, correct);
        setMessages(gameChats);
        console.log('currentProblem', currentProblem);
        if (correct) {
          if (chat.userId === profile.id) {
            // const newScore = score + 1;
            score = score + 1;
            console.log('score', score);
          }

          console.log('bbbbbbb');
          setCurrentProblem(problem);
        }
      },
    );
    socketRef.current.on('newProblem', (problem: string) => {
      setCurrentProblem(problem);
    });
    // socketRef.current.on('finishGame', ()=> {
    //   navigation.
    // });
  }, []);

  const send = () => {
    socketRef.current.emit('chatting', inviteCode, {
      userId: profile.id,
      userChat: chat,
    });
  };

  return (
    <View>
      <Text>{currentProblem}</Text>
      <TouchableOpacity onPress={send}>
        <Text>send</Text>
      </TouchableOpacity>
      <TextInput value={chat} onChangeText={setChat} placeholder="input" />
    </View>
  );
};

export default DoingGameScreen;
