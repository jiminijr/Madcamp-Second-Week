import React, { FC, useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { getProfile, login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
 
type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const LoginScreen: FC<Props> = ({ setIsLogin, setProfile, setToken }) => {
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const login = async () => {
    try {
      const token = await kakaoLogin();
      const profile = await getProfile();
      setToken(JSON.stringify(token));
      setProfile(JSON.stringify(profile)); // 프로필 정보 저장
      setIsLogin(true)
      // navigation.navigate('EnterGame', { profile:profile }); // 프로필 정보를 파라미터로 전달
    } catch (err) {
      console.error('Kakao Login Error', err);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/loginBackground.png')}
      style={styles.background}
      resizeMode="stretch">
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/images/myohan.png')}
          style={styles.myohan}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={login} style={styles.button}>
          <Image
            source={require('../../assets/images/kakaoLogo.png')}
            style={styles.kakaoLogo}
          />
          <Text style={styles.loginText}>카카오로 로그인</Text>
        </TouchableOpacity>
      </View>
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
  },
  myohan: {
    marginTop: 68,
    marginLeft: 40,
    width: 148,
    height: 148,
  },
  button: {
    flexDirection: 'row',
    width: 200,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEE500',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  kakaoLogo: {
    width: 24,
    height: 24,
  },
  loginText: {
    flex: 1,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});

export default LoginScreen;


