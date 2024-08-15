import { AuthReducerState, UserReducerType } from './AuthContext';

export type AuthReducerAction =
  | { type: 'signIn'; payload: UserReducerType }
  | { type: 'signOut' }
  | { type: 'updateUser'; updatedPayload: Partial<UserReducerType> };

export const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'signIn':
      return { logged: true, user: action.payload } as AuthReducerState;
    case 'signOut':
      return { logged: false, user: { email: '', password: '', role: '' } } as AuthReducerState;
    case 'updateUser':
      return { logged: true, user: action.updatedPayload } as AuthReducerState;

    default:
      return state;
  }
};
