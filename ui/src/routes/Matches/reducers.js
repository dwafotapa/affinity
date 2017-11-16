import {
  REQUEST_MATCHES,
  RECEIVE_MATCHES,
} from './actions';

const initialState = {
  isFetching: false,
  items: []
};

const matches = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MATCHES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_MATCHES:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    default:
      return state;
  }
}

export default matches;