import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const EnterGameScreen = () => {
  const [gameSelectModalVisible, setGameSelectModalVisible] =
    useState<boolean>(false);
  const [gameTitle, setGameTitle] = useState<string>();
  const navigation = useNavigation();

  const selectGame = (value: string) => () => {
    setGameTitle(value);
    setGameSelectModalVisible(false);
    navigation.navigate('WaitGame', { gameTitle: value });
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
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/enterGame.png')}
              style={styles.enterBtn}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.profile}
        />
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
            onPress={selectGame('Game1')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>4글자</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('Game2')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>속담</Text>
          </Pressable>
          <Pressable
            onPress={selectGame('Game3')}
            style={{
              ...styles.selectorBtn,
              borderBottomWidth: 0.5,
              borderColor: 'white',
            }}>
            <Text style={styles.selectorText}>인물</Text>
          </Pressable>
          <Pressable onPress={selectGame('Game4')} style={styles.selectorBtn}>
            <Text style={styles.selectorText}>영화</Text>
          </Pressable>
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

export default EnterGameScreen;
