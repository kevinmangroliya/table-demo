import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tableReducer from './feature/tableSlice';

const rootReducer = combineReducers({
    tableData: tableReducer,
  });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
