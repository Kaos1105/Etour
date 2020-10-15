import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// TO-DO: Add redux observable
// const rootREpics = combineEpics(adminEpic);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const configureStore = (initialState = { admin: {} }) => {
  // const epicMiddleware = createEpicMiddleware();
  // const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(epicMiddleware)));
  // epicMiddleware.run(rootREpics);
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
};

export default configureStore();
