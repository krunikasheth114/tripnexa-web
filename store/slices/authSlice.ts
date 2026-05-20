import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const TOKEN_KEY = 'tn_access_token';
const USER_KEY  = 'tn_user';

// Rehydrate from localStorage on initial load (client only)
function loadInitialState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, accessToken: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user  = localStorage.getItem(USER_KEY);
    if (token && user) {
      return { accessToken: token, user: JSON.parse(user), isAuthenticated: true };
    }
  } catch {}
  return { user: null, accessToken: null, isAuthenticated: false };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser; accessToken: string }>) {
      state.user            = action.payload.user;
      state.accessToken     = action.payload.accessToken;
      state.isAuthenticated = true;
      // Persist to localStorage
      localStorage.setItem(TOKEN_KEY, action.payload.accessToken);
      localStorage.setItem(USER_KEY,  JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user            = null;
      state.accessToken     = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
