import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import filters from '../components/Sidebar/reducer';
import matches from '../routes/MatchList/reducer';

const rootReducer = combineReducers({
  filters,
  matches
});

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, createLogger())
);

export default function configureStore(preloadedState) {  
  return createStore(rootReducer, preloadedState, enhancer);
}