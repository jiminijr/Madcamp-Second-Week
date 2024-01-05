import {FC} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

type Props = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginScreen: FC<Props> = ({isLogin, setIsLogin}) => {
  const login = () => {
    setIsLogin(true);
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
