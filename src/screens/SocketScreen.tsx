import React, {useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import io from 'socket.io-client';

const id = Math.random();

const SocketScreen = () => {
  const [messageList, setMessageList] = useState<
    {id: number; message: string}[]
  >([]);
  const [message, setMessage] = useState<string>('');

  //   useEffect(() => {
  //     socket.on('chatting', (data: {id: number; message: string}[]) => {
  //       setMessageList(data);
  //       //   console.log(data);
  //     });
  //     // socket.disconnect();
  //     return () => {
  //       socket.disconnect;
  //     };
  //   }, []);

  const socket = io(
    `http://ec2-43-201-23-42.ap-northeast-2.compute.amazonaws.com:3000/gamelobby/`,
  );
  const create = () => {
    socket.emit('createRoom', 1, id);
    socket.on('createRoom', code => {
      console.log(code);
    });
  };

  const join = () => {
    // const socket = io(`http://192.249.30.240:3000/gamelobby/`);
    let joined = false;
    const code = `12345`;
    socket.emit('joinRoom', code, id);
    socket.on('joinRoom', success => {
      joined = success;
      if (!joined) console.log('failed');
      else {
        socket.on('members', data => {
          console.log(data);
        });
      }
    });
  };

  const exit = () => {
    // const socket = io(`http://192.249.30.65:3000/gamelobby/`);
    socket.disconnect();
  };

  const onChangeMessage = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setMessage(evt.nativeEvent.text);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Pressable
        style={{width: 100, height: 100, backgroundColor: 'red'}}
        onPress={create}>
        <Text>create</Text>
      </Pressable>
      <Pressable
        style={{width: 100, height: 100, backgroundColor: 'green'}}
        onPress={join}>
        <Text>join</Text>
      </Pressable>
      <Pressable
        style={{width: 100, height: 100, backgroundColor: 'blue'}}
        onPress={exit}>
        <Text>exit</Text>
      </Pressable>
      <TextInput
        value={message}
        placeholder="type"
        onChange={onChangeMessage}
      />
      {messageList.map((message, index) => (
        <Text
          key={index}>{`id: ${message.id} message: ${message.message}`}</Text>
      ))}
    </View>
  );
};

export default SocketScreen;
