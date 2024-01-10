import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GameStackParamList} from '../navigators/GameStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';

type Props = StackScreenProps<GameStackParamList, 'EndingGame'>;

const EndingGameScreen = () => {
  const route = useRoute<Props['route']>();
  const navigation = useNavigation<Props['navigation']>();

  const users = route.params.users;

  console.log(route.params.users);

  const exit = () => {
    navigation.navigate('EnterGame', {
      profile: route.params.profile,
      token: route.params.token,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="stretch">
      <ImageBackground
        source={require('../../assets/images/stairs.png')}
        style={styles.stairsImage}>
        <View style={styles.firstContainer}>
          <FastImage
            source={require('../../assets/images/num1.gif')}
            style={styles.firstimage}
            resizeMode="contain"
          />
          <FastImage
            source={require('../../assets/images/dancing1.gif')}
            style={styles.dancingfirstimage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.secondContainer}>
          <FastImage
            source={require('../../assets/images/num2.gif')}
            style={styles.firstimage}
            resizeMode="contain"
          />

          <FastImage
            source={require('../../assets/images/dancing2.gif')}
            style={styles.dancingfirstimage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.thirdContainer}>
          <FastImage
            source={require('../../assets/images/num3.gif')}
            style={styles.firstimage}
            resizeMode="contain"
          />
          <FastImage
            source={require('../../assets/images/dancing3.gif')}
            style={styles.dancingfirstimage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.firstpersonContainer}>
          <Image
            source={{uri: users[0].thumbnailImageUrl}}
            style={styles.thumbnailimage}
            resizeMode="contain"
          />
          <Text style={styles.firstrank}>{users[0].nickname}</Text>
        </View>
        {users.length >= 2 && (
          <View style={styles.secondpersonContainer}>
            <Image
              source={{uri: users[1].thumbnailImageUrl}}
              style={styles.thumbnailimage}
              resizeMode="contain"
            />
            <Text style={styles.firstrank}>{users[1].nickname}</Text>
          </View>
        )}
        {users.length >= 3 && (
          <View style={styles.thirdpersonContainer}>
            <Image
              source={{uri: users[2].thumbnailImageUrl}}
              style={styles.thumbnailimage}
              resizeMode="contain"
            />
            <Text style={styles.firstrank}>{users[2].nickname}</Text>
          </View>
        )}
      </ImageBackground>

      <View style={styles.blackBox}>
        <Text style={styles.blackBoxText}>조연</Text>
        <ScrollView>
          <View style={styles.textContainer}>
            <View>
              {users.map(
                (user, index) =>
                  index % 2 === 1 && (
                    <Text style={styles.assistText}>{user.nickname}</Text>
                  ),
              )}
            </View>
            <View>
              {users.map(
                (user, index) =>
                  index % 2 === 0 && (
                    <Text style={styles.assistText}>{user.nickname}</Text>
                  ),
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button}>
          <ImageBackground
            source={require('../../assets/images/restart.png')}
            style={styles.buttonImage}>
            <Text style={styles.buttonText}>다시 시작</Text>
          </ImageBackground>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={exit}>
          <ImageBackground
            source={require('../../assets/images/exit.png')}
            style={styles.buttonImage}
            resizeMode="contain">
            <Text style={styles.buttonText}>나가기</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  gifs: {
    //
  },
  firstContainer: {
    position: 'absolute',
    flexDirection: 'column',
    width: 100,
    left: 100,
    bottom: 147,
    alignItems: 'center',
  },
  firstimage: {
    width: 55,
    height: 60,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  dancingfirstimage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  secondContainer: {
    position: 'absolute',
    flexDirection: 'column',
    width: 100,
    left: 0,
    bottom: 92,
    alignItems: 'center',
  },
  secondimage: {
    width: 30,
    height: 50,
    resizeMode: 'contain',
  },
  dancingsecondimage: {
    width: 50,
    height: 100,
    resizeMode: 'contain',
  },

  thirdContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: 100,
    left: 200,
    bottom: 62,
  },
  thirdimage: {
    width: 26,
    height: 70,
    resizeMode: 'contain',
  },
  dancingthirdimage: {
    width: 50,
    height: 100,
    resizeMode: 'contain',
  },

  firstpersonContainer: {
    position: 'absolute',
    flexDirection: 'column',
    width: 100,
    left: 100,
    bottom: 80,
    alignItems: 'center',
  },
  thumbnailimage: {
    width: 36,
    height: 36,
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 30,
  },
  firstrank: {
    fontSize: 20,
    fontFamily: 'baemin',
  },
  secondpersonContainer: {
    position: 'absolute',
    flexDirection: 'column',
    width: 100,
    left: 0,
    bottom: 30,
    alignItems: 'center',
  },
  thirdpersonContainer: {
    position: 'absolute',
    flexDirection: 'column',
    width: 100,
    left: 200,
    bottom: 0,
    alignItems: 'center',
  },

  stairsImage: {
    width: 300,
    height: 150,
    marginTop: 160,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  blackBox: {
    backgroundColor: 'black',
    alignSelf: 'center',
    width: 300,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    // 필요한 경우 추가 스타일링
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-evenly',
    flex: 1,
  },
  blackBoxText: {
    color: 'white',
    fontSize: 30,
  },
  assistText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EndingGameScreen;
