import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { GameStackParamList } from '../navigators/GameStackNavigator';
import FastImage from 'react-native-fast-image';

type Props = StackScreenProps<GameStackParamList, 'EnterGame'>

const EnterGameScreen = () => {
  const [gameSelectModalVisible, setGameSelectModalVisible] =
    useState<boolean>(false);
    const [CodeInputVisible, setCodeInputModalVisible] =
    useState<boolean>(false);
    const [enteredCode, setEnteredCode] = useState('');
  const [gameTitle, setGameTitle] = useState<string>();

  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();

  const profile = JSON.parse(route.params.profile);
  console.log(profile)

  const selectGame = (value: string) => () => {
    const code = generateRandomCode(); // 랜덤 코드 생성
    setGameTitle(value);
    setGameSelectModalVisible(false);
    setCodeInputModalVisible(false);
    navigation.navigate('WaitGame', { gameTitle: value, inviteCode: code  });
    console.log(profile, '엔터게임')
    console.log(value)
    console.log('Generated Invite Code:', code); 
  };

  const handleCodeSubmit = () => {
    console.log('Entered Code:', enteredCode);
    // 여기에 코드 처리 로직 추가
    // 예: navigation.navigate('GameLobby', { enteredCode: enteredCode });
  };
  const generateRandomCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
  };

  
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="stretch">
      <View style={styles.overlay}>
        <View style={styles.enterBtnContainer}>
          <TouchableOpacity
            onPress={() => {
              setGameSelectModalVisible(true);
            }}>
            <Image
              source={require('../../assets/images/inviteGame.png')}
              style={styles.enterBtn}
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
              setCodeInputModalVisible(true);
            }}>
            <Image
              source={require('../../assets/images/enterGame.png')}
              style={styles.enterBtn}
            />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={require('../../assets/images/profile.png')}
          style={styles.profile}
        >
          <Image source={{ uri: profile.thumbnailImageUrl }} style={styles.thumbnail} />
          <Text style={styles.name}>{profile.nickname}</Text>
        </ImageBackground>
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
      <Modal
        visible={CodeInputVisible}
        onRequestClose={() => {
          setCodeInputModalVisible(false);
        }}
        animationType="fade"
        transparent={true}>
        <Pressable
          style={styles.modalOutside}
          onPress={() => setCodeInputModalVisible(false)}
        />
         <View style={styles.modalContainer}>
            <FastImage
            source={require('../../assets/images/enter_game.gif')}
            style={styles.gifImage}
            />
          <TextInput
            style={styles.codeInput}
            onChangeText={setEnteredCode}
            value={enteredCode}
            placeholder="코드를 입력하세요."
            keyboardType="default"
          />
          <TouchableOpacity onPress={handleCodeSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
  },
  enterBtnContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  enterBtn: {
    width: 120,
    height: 120,
  },
  profile: {
    width: 200,
    height: 230,
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
    fontSize: 30
  },
  divider: {
    height: 1, 
    backgroundColor: 'black', 
  },
  
  profileInfoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -115 }],
    alignItems: 'center',
  },
  thumbnail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 90,
    height: 120,
    transform: [{ translateX: -45 }, { translateY: -105 }],
    borderRadius: 50,
  },
  name: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    transform: [{ translateX: -40 }, { translateY: 45 }],
    fontSize: 25,
    color: 'black',
    fontFamily: 'baemin',
    marginTop: 5,
    textAlign:'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 400,
    transform: [{translateX: -150}, {translateY: -200}],
    backgroundColor: '#FEFAE1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  codeInput: {
    width: '80%',
    borderBottomWidth: 2,
    fontSize: 20,
    fontFamily: 'baemin',
    textAlign:'center',
    padding: 10
  },
  submitButton: {
    backgroundColor: '#FFD400',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  submitButtonText: {
    color: 'black',
    fontFamily: 'baemin',
    fontSize: 18
  },
  gifImage: {
    width: 200,
    height: 200,
  }
});

export default EnterGameScreen;
