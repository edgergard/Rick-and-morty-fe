import { combineReducers } from '@reduxjs/toolkit';
import { charactersReducer } from './charactersSlice';
import { drawerReducer } from './drawerSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
  drawer: drawerReducer,
});

export default rootReducer;
