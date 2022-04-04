import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accounts';
import { courseReducer } from './courses/reducer';
import chatRootReducer from './iot/reducer';
import liveReducer from './live/liveReducer';
import programReducer from './programs/programsSlice';
import { qReducer } from './qpaper/reducer';


const store = configureStore({
  reducer: {
    Courses: courseReducer,
    Accounts: accountReducer,
    QPaper: qReducer,
    Programs: programReducer,
    // Forums: forumsReducer,
    Live: liveReducer,
    IOT: chatRootReducer,

  }
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
