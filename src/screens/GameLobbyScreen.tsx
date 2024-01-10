import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Dimensions,
  BackHandler,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {invert} from 'react-native-svg/lib/typescript/elements/Shape';
import {Socket, io} from 'socket.io-client';
import {Profile} from '../../App';

const {width, height} = Dimensions.get('window');

type Props = StackScreenProps<GameStackParamList, 'GameLobby'>;

const GameLobbyScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const initialGameTitle = route.params.gameTitle;
  const inviteCode = route.params.inviteCode;
  const profile = route.params.profile;
  const [users, setUsers] = useState<Profile[]>([]);
  const [gameSelectModalVisible, setGameSelectModalVisible] =
    useState<boolean>(false);
  const [gameTitle, setGameTitle] = useState<string>(initialGameTitle);
  const [hostId, setHostId] = useState<number>(-1);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // 서버에서 사용자 목록을 가져오는 로직 구현
    socketRef.current = io('http://192.249.30.240:3000/gamelobby');
    socketRef.current?.emit('joinRoom', inviteCode, profile);
    if (!start) {
      socketRef.current?.on(
        'members',
        (gameInfo: {users: Profile[]; gameMode: string; hostId: number}) => {
          setUsers(gameInfo.users);
          setGameTitle(gameInfo.gameMode);
          setHostId(gameInfo.hostId);
        },
      );
    }
    socketRef.current?.on('changeGame', (gameMode: string) => {
      setGameTitle(gameMode);
    });

    socketRef.current.on('startGame', (start: boolean) => {
      setStart(start);
    });

    const handleBackPress = () => {
      socketRef.current?.disconnect();
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      socketRef.current.disconnect();
      navigation.replace('DoingGame', {
        profile: profile,
        token: route.params.token,
        gameTitle: gameTitle,
        inviteCode: inviteCode,
        hostId: hostId,
        users: users,
      });
    }
    setIsFirstRender(false);
  }, [start]);

  // useEffect(() => {
  //   socket.on('changeGame', gameMode => {
  //     console.log(gameMode);
  //     setGameTitle(gameMode);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!isFirstRender) {
  //     socket.emit('changeGame', inviteCode, gameTitle);
  //     socket.on('changeGame', (gameMode: string) => {
  //       setGameTitle(gameMode);
  //     });
  //   }
  //   setIsFirstRender(false);
  // }, [gameTitle]);

  const playGame = () => {
    socketRef.current.emit('startGame', inviteCode);
  };

  const selectGame = (value: string) => () => {
    setGameSelectModalVisible(false);
    socketRef.current?.emit('changeGame', inviteCode, value);
    socketRef.current?.on('changeGame', (gameMode: string) => {
      setGameTitle(gameMode);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="stretch">
      <View>
        <View style={styles.bbaammContainer}>
          <FastImage
            source={require('../../assets/images/bbaamm.gif')}
            style={styles.gifImage2}
          />
        </View>
        <View style={styles.topContainer}>
          <FastImage
            source={require('../../assets/images/guitar.gif')}
            style={styles.gifImage}
          />
          <View style={styles.userContainer}>
            <FlatList
              style={styles.flatList}
              data={users}
              contentContainerStyle={{gap: 5}}
              renderItem={({item}) => (
                <Text style={styles.text1} key={item.id}>
                  {item.nickname}
                </Text>
              )}
            />
            <Text style={styles.text4}> {users.length} / 10 </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text2}>초대 코드 : {inviteCode}</Text>
        <Text style={styles.text3}>현재 게임 : {gameTitle}</Text>
      </View>
      {profile.id === hostId && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={playGame} style={styles.button}>
            <ImageBackground
              source={require('../../assets/images/gamestart.png')}
              style={styles.buttonImage}>
              <Text style={styles.buttonText}>게임 시작</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setGameSelectModalVisible(true);
            }}
            style={styles.button}>
            <ImageBackground
              source={require('../../assets/images/gamechange.png')}
              style={styles.buttonImage}
              resizeMode="contain">
              <Text style={styles.buttonText}>게임 변경</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={gameSelectModalVisible}
        onRequestClose={() => {
          setGameSelectModalVisible(false);
        }}
        animationType="fade"
        transparent={true}>
        <Pressable
          style={styles.modalOutside}
          onPress={() => setGameSelectModalVisible(false)}
        />
        <View style={styles.selectorContainer}>
          <Pressable
            onPress={selectGame('4글자')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 1,
              borderColor: 'black',
            }}>
            <Text style={styles.selectorText}>4글자</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('랜덤')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 1,
              borderColor: 'black',
            }}>
            <Text style={styles.selectorText}>랜덤</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('인물')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 1,
              borderColor: 'black',
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
    // width: '100%',
    // height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bbaammContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    // gap: 8,
    justifyContent: 'center',
  },
  flatList: {
    // position: 'absolute',
    // top: height * 0.17, // 전체 높이의 80%
    // left: width * 0.6, // 전체 너비의 80%
    // width: width * 0.3, // 전체 너비의 20%
    // height: height * 0.3, // 전체 높이의 30%
    backgroundColor: '#512207',
    padding: 10,
    borderRadius: 12,
    height: 250,
  },
  userContainer: {
    gap: 8,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  text1: {
    fontFamily: 'baemin',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#512207',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '3%',
  },
  text4: {
    fontSize: 18,
    color: 'black',
    width: width * 0.3,
    alignItems: 'center',
    fontFamily: 'baemin',
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    color: 'black',
    width: width * 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '3%',
    textAlign: 'center',
    fontFamily: 'baemin',
    borderRadius: 30,
  },
  text3: {
    fontSize: 20,
    color: 'black',
    width: width * 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '3%',
    textAlign: 'center',
    fontFamily: 'baemin',
    borderRadius: 30,
  },
  gifImage: {
    width: 200,
    height: 270,
    alignItems: 'center',
  },
  gifImage2: {
    width: 150,
    height: 80,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 90,
    height: 90,
  },
  buttonText: {
    position: 'absolute',
    top: 4,
    width: 60,
    left: '50%',
    transform: [{translateX: -30}],
    fontFamily: 'baemin',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
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
    backgroundColor: '#FEFAE1',
    borderRadius: 12,
  },
  selectorBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  selectorText: {
    color: 'black',
    fontFamily: 'baemin',
    fontSize: 30,
  },
});

export default GameLobbyScreen;
