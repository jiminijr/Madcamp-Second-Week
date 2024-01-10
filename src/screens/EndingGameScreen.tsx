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

const EndingGameScreen = () => {
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
            source={require('../../assets/images/jihwan.png')}
            style={styles.thumbnailimage}
            resizeMode="contain"
          />
          <Text style={styles.firstrank}>1등</Text>
        </View>
        <View style={styles.secondpersonContainer}>
          <Image
            source={require('../../assets/images/jihwan.png')}
            style={styles.thumbnailimage}
            resizeMode="contain"
          />
          <Text style={styles.firstrank}>2등</Text>
        </View>
        <View style={styles.thirdpersonContainer}>
          <Image
            source={require('../../assets/images/jihwan.png')}
            style={styles.thumbnailimage}
            resizeMode="contain"
          />
          <Text style={styles.firstrank}>3등</Text>
        </View>
      </ImageBackground>

      <View style={styles.blackBox}>
        <View style={styles.textContainer}>
          <Text style={styles.blackBoxText}>조연</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <ImageBackground
            source={require('../../assets/images/restart.png')}
            style={styles.buttonImage}>
            <Text style={styles.buttonText}>다시 시작</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <ImageBackground
            source={require('../../assets/images/exit.png')}
            style={styles.buttonImage}
            resizeMode="contain">
            <Text style={styles.buttonText}>게임 퇴장</Text>
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
    width: 272,
    height: 153,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // 필요한 경우 추가 스타일링
  },
  blackBoxText: {
    color: 'white',
    fontSize: 30,
  },
});

export default EndingGameScreen;
