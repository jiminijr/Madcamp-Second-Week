import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {invert} from 'react-native-svg/lib/typescript/elements/Shape';

const {width, height} = Dimensions.get('window');

type Props = StackScreenProps<GameStackParamList, 'GameLobby'>;

const GameLobbyScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const initialGameTitle = route.params?.gameTitle;
  const inviteCode = route.params?.inviteCode;
  const profile = JSON.parse(route.params.profile);
  const [users, setUsers] = useState([]);
  const [gameSelectModalVisible, setGameSelectModalVisible] =
    useState<boolean>(false);
  const [gameTitle, setGameTitle] = useState<string>(initialGameTitle);

  const selectGame = (value: string) => () => {
    setGameTitle(value);
    setGameSelectModalVisible(false);
    navigation.navigate('GameLobby', {
      gameTitle: value,
      inviteCode: inviteCode,
    });
    console.log(profile, '게임로비');
    console.log(value);
  };

  useEffect(() => {
    // 서버에서 사용자 목록을 가져오는 로직 구현
    setUsers([
      {id: '1', name: '사용자1'},
      {id: '2', name: '사용자2'},
      {id: '3', name: '사용자3'},
      {id: '4', name: '사용자4'},
      {id: '5', name: '사용자5'},
      {id: '6', name: '사용자6'},
      {id: '7', name: '사용자7'},
      {id: '8', name: '사용자8'},
    ]);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="stretch">
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
            keyExtractor={item => item.id}
            contentContainerStyle={{gap: 5}}
            renderItem={({item}) => (
              <Text style={styles.text1}>{item.name}</Text>
            )}
          />
          <Text style={styles.text4}> {users.length} / 10 </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text2}>초대 코드 : {inviteCode}</Text>
        <Text style={styles.text3}>현재 게임 : {gameTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            /* 게임 시작 로직 */
          }}
          style={styles.button}>
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
            onPress={selectGame('속담')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 1,
              borderColor: 'black',
            }}>
            <Text style={styles.selectorText}>속담</Text>
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
    // padding: '5%',
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
    // top: height * 0.07,
    // left: width * 0.67,
    alignItems: 'center',
    fontFamily: 'baemin',
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    color: 'black',
    width: width * 0.6,
    // top: height * 0.1,
    // left: width * 0.2,
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
    // top: height * 0.13,
    // left: width * 0.2,
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
    // position: 'absolute',
    // top: height * 0.27, // 전체 높이의 30%
    // left: width * 0.28, // 전체 너비의 25%
    // transform: [{translateX: -100}, {translateY: -115}],
    alignItems: 'center',
  },
  gifImage2: {
    width: 150,
    height: 80,
    // position: 'absolute',
    // top: height * 0.17, // 전체 높이의 20%
    // left: width * 0.8, // 전체 너비의 80%
    // transform: [{translateX: -100}, {translateY: -115}],
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  button: {
    // position: 'absolute',
    // top: height * 0.75, // 전체 높이의 52.2%
    // left: width * 0.14, // 전체 너비의 24%
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
