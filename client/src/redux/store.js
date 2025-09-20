import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; //

const store = configureStore({
  reducer: rootReducer,
  // redux-thunk is included by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
