import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discoverCourses, joinedCourses } from '../../api/courses';
import { onLogout } from '../accounts';
import { addCourses } from '../courses/actions';

const INITIAL_STATE = {
  disFetch: false,
  disPending: true,
  discover: [],
  disError: false,
  disMsg: '',
  joinFetch: false,
  joinPending: true,
  joined: [],
  joinError: false,
  joinMsg: '',
  completed: [],
  EnCourses: {}
}

/* thunk actions */
export const fetchDiscoverCourses = createAsyncThunk('Programs/fetchDiscover', async (_, { dispatch }) => {
  const { data } = await discoverCourses();
  dispatch(addCourses(data.discover.courses));
  return data.discover;
}, {
  condition: (args, { getState }) => {
    const { Programs } = getState();
    if (Programs.disFetch) {
      return false;
    }
    return true;
  }
});

export const fetchJoinedCourses = createAsyncThunk('Programs/fetchJoined', async (_, { dispatch }) => {
  const { data } = await joinedCourses();
  dispatch(addCourses(data.getJoined));
  return data.getJoined;
}, {
  condition: (args, { getState }) => {
    const { Programs } = getState();
    if (Programs.joinFetch) {
      return false;
    }
    return true;
  }
});

export const programsSlice = createSlice({
  name: 'Programs',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoverCourses.pending, (state) => {
        state.disPending = true;
      })
      .addCase(fetchDiscoverCourses.fulfilled, (state, action) => {
        state.disFetch = true;
        state.disPending = false;
        state.discover = action.payload.courses.reduce((accumulator: any[], currentVal: { id: string; }) => accumulator.concat(currentVal.id), []);
        state.EnCourses = action.payload.joined;
        state.completed = [];
      })
      .addCase(fetchDiscoverCourses.rejected, (state, action) => {
        state.disError = true;
        state.disMsg = action.error.toString()
      })
      .addCase(fetchJoinedCourses.pending, (state) => {
        state.joinPending = true;
      })
      .addCase(fetchJoinedCourses.fulfilled, (state, action) => {
        state.joinFetch = true;
        state.joinPending = false;
        state.joined = action.payload.reduce((accumulator: any[], currentVal: { id: string; }) => accumulator.concat(currentVal.id), []);
      })
      .addCase(fetchJoinedCourses.rejected, (state, action) => {
        state.joinError = false;
        state.joinMsg = action.error.toString()
      })
      .addCase(onLogout, state => INITIAL_STATE)
  },
});

export default programsSlice.reducer;
