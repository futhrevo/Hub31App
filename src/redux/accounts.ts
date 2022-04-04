import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Auth from '@aws-amplify/auth';
import { attachConnect } from '../api/policies';

export const ON_LOGOUT = 'Accounts/onLogout';

const INITIAL_STATE = {
  login: false,
  isTeacher: false,
  isStudent: false,
  dname: 'JOHN DOE',
  sub: '',
  identityId: ''
}
export const refreshUserData = createAsyncThunk('Accounts/refreshUserData', async (fromPool: boolean = false) => {
  let attributes, signInUserSession;
  if (fromPool) {
    ({ attributes, signInUserSession } = await Auth.currentUserPoolUser());
  } else {
    ({ attributes, signInUserSession } = await Auth.currentAuthenticatedUser());
  }
  const { identityId } = await Auth.currentUserCredentials();
  attributes.identityId = identityId;
  try {
    await attachConnect();
  } catch (error) {

  }
  const groups = signInUserSession.accessToken.payload["cognito:groups"];
  if (groups.indexOf("teacher") > -1) {
    attributes.isTeacher = true;
  } else attributes.isTeacher = false;
  return attributes;
});

export const accountsSlice = createSlice({
  name: 'Accounts',
  initialState: INITIAL_STATE,
  reducers: {
    onLogin: (state) => {
      state.login = true;
      state.isTeacher = false;
    },
    onLogout: (state) => {
      state.login = false;
    },
    updateAttrs: (state, action) => {
      return {
        ...state,
        ...action.payload,
        dname: `${action.payload.name} ${action.payload.family_name || ''}`.toUpperCase()
      }
    },
    setTeacher: (state, action) => {
      state.isTeacher = action.payload;
      state.isStudent = !action.payload;
    },
    asStudent: (state, action) => {
      state.isStudent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshUserData.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          dname: `${action.payload.name} ${action.payload.family_name || ''}`.toUpperCase()
        }
      })
  }
})

export const {
  onLogin,
  onLogout,
  updateAttrs,
  setTeacher,
  asStudent
} = accountsSlice.actions;

export default accountsSlice.reducer;
