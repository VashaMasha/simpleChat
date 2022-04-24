import { SET_MESSAGES } from '../constants';

const initialState = {
  messages: [],
};

const messagesReducer = (app = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...app,
        messages: action.payload,
      };
    default:
      return app;
  }
};

export default messagesReducer;
