import React, { useEffect, useState } from 'react';
import {
  Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, FlatList, Alert,
} from 'react-native';
import { getMessages } from '../api/fetcHandler';
import colors from '../theme/colors';
import { MessageItem } from '../types/MessageItemType';

const chatContentHeight = Dimensions.get('window').height - 130;

const ChatScreen = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getMessages()
      .then((res: MessageItem[]) => {
        setMessages(res);
      })
      .catch(() => {
        Alert.alert("Oops... Something went wrong.")
      });
  }, []);

  const onTextInputChange = (text: string) => {
    setInputText(text);
  };

  const onSendMessagePressed = () => {

  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={messages}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          contentContainerStyle={{ height: chatContentHeight }}
          renderItem={({ item, index }) => (
            <View style={styles.messageContainer}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.icon}
              />
              <View>
                <Text style={styles.usernameText}>{item.username}</Text>
                <Text>{item.body}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item: any) => (item.id)}
        />
      </View>
      <TextInput
        value={inputText}
        onChangeText={onTextInputChange}
        multiline
        style={styles.inputContainer}
      />
      <TouchableOpacity style={styles.inputButton} onPress={onSendMessagePressed}>
        {/* <Image source={SentMessageIcon} /> */}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: colors.black,
    marginRight: 10,
    borderRadius: 65,
  },
  usernameText: {

  },
  inputButton: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    height: 50,
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
  },
});

export default ChatScreen;
