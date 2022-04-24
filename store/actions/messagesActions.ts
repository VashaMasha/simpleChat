import { SET_MESSAGES } from '../constants';
import { MessageItem } from '../../src/types/MessageItemType';

export function setMessagesAction(messages: MessageItem[]) {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
}
