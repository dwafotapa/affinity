import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './App';
import filters from './components/Sidebar/reducers';
import matches from './routes/Matches/reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

const middlewares = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const rootReducer = combineReducers({
  filters,
  matches
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
