import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import filters from '../components/Sidebar/reducers';
import matches from '../routes/Matches/reducers';

const rootReducer = combineReducers({
  filters,
  matches
});

const enhancer = composeWithDevTools(
  applyMiddleware(createLogger(), thunk)
);

export default function configureStore(initialState) {  
  return createStore(rootReducer, initialState, enhancer);
}