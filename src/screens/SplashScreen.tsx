import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SoundPlayer from 'react-native-sound-player';

const SplashScreen = () => {
  useEffect(() => {
    SoundPlayer.playSoundFile('stalla', 'mp3');
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../assets/images/hello.gif')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD400',
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -100}, {translateY: -100}],
  },
});

export default SplashScreen;
