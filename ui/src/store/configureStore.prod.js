import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filters from '../components/Sidebar/reducers';
import matches from '../routes/Matches/reducers';

const rootReducer = combineReducers({
  filters,
  matches
});

const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}