import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filters from '../components/Sidebar/reducer';
import matches from '../routes/Matches/reducer';

const rootReducer = combineReducers({
  filters,
  matches
});

const enhancer = applyMiddleware(thunk);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}