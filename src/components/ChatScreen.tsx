import React, { useEffect, useState, useRef } from 'react';
import {
  Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, FlatList, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../api/fetcHandler';
import colors from '../theme/colors';
import { MessageItem } from '../types/MessageItemType';
import SentMessageIcon from '../assets/SentMessageIcon.png';
import { setMessagesAction } from '../../store/actions/messagesActions';

const chatContentHeight = Dimensions.get('window').height - 120;
const myName = 'Me Myself and I';

const ChatScreen = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  const dispatch = useDispatch();
  const sentMessages = useSelector((state: any) => state.messages?.messages);

  useEffect(() => {
    getMessages()
      .then((res: MessageItem[]) => {
        const chatMessages = res.concat(sentMessages);
        chatMessages.sort((a, b) => moment(a.createdAt).toDate().getTime() - moment(b.createdAt).toDate().getTime());
        setMessages(chatMessages);
      })
      .catch(() => {
        Alert.alert('Oops... Something went wrong.');
      });
  }, [isLoading]);

  const onTextInputChange = (text: string) => {
    setInputText(text);
  };

  const onSendMessagePressed = async () => {
    if (!inputText) return;
    setIsLoading(true);
    setInputText('');
    const message = {
      avatar: 'https://picsum.photos/200',
      body: inputText,
      createdAt: (new Date()).toUTCString(),
      id: uuid.v4().toString(),
      user: uuid.v4().toString(),
      username: myName,
    };
    sentMessages.push(message);
    await dispatch(setMessagesAction(sentMessages));
    setIsLoading(false);
    flatListRef?.current?.scrollToEnd();
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <FlatList
            data={messages}
            ref={flatListRef}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.container}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                {/* item.avatar does not load.
              So i desided to replase it with anoter random icon */}
                <Image
                  source={{ uri: item.username === myName ? item.avatar : `https://picsum.photos/${item.id}` }}
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.messageUsername}>{item.username}</Text>
                  <Text style={styles.messageBody}>{item.body}</Text>
                </View>
            <Text style={styles.messageTime}>{moment(item.createdAt).format('HH:mm')} {moment(item.createdAt).format('MMM DD')}</Text>
              </View>
            )}
            keyExtractor={(item: any) => (item.id)}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={inputText}
              onChangeText={onTextInputChange}
              multiline
              style={styles.input}
            />
            <TouchableOpacity style={styles.inputButton} onPress={onSendMessagePressed}>
              <Image source={SentMessageIcon} />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: chatContentHeight,
  },
  contentContainerStyle: {
    marginHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius: 65,
  },
  messageUsername: {
    color: colors.gray,
  },
  messageBody: {
    marginRight: 70,
  },
  messageTime: {
    right: 5,
    position: 'absolute',
    color: colors.gray,
    textAlign: 'right',
    fontSize: 12,
  },
  inputButton: {
    alignSelf: 'center',
    marginRight: 10,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 1,
  },
  input: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
});

export default ChatScreen;
