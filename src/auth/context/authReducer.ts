import { AuthReducerState, UserReducerType } from './AuthContext';

export type AuthReducerAction = { type: 'signIn'; payload: UserReducerType } | { type: 'signOut' };

export const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'signIn':
      return { logged: true, user: action.payload } as AuthReducerState;
    case 'signOut':
      return { logged: false, user: { id: '', email: null } } as AuthReducerState;

    default:
      return state;
  }
};
