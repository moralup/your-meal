import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { basketReducer } from './basket-reducer';
const rootReducer = combineReducers({
  basket: basketReducer,
});

export const store = configureStore({ reducer: rootReducer });
