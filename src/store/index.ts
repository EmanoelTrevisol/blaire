import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import loaderReducer from './loader/reducer';
import postsReducer from './posts/reducer';
import newsReducer from './news/reducer';

const reducers = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  posts: postsReducer,
  news: newsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
