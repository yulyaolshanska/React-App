import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/taskSlice";
import taskListReducer from "./taskList/taskListSlice";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { taskHistoryReducer } from "./taskHistory/taskHistorySlice";

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskLists: taskListReducer,
  taskHistory: taskHistoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
