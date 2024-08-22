import { IUser } from '../../interfaces/user.interface';
import { AuthReducerState } from './AuthContext';

export type AuthReducerAction =
  | { type: 'signIn'; payload: IUser }
  | { type: 'signOut' }
  | { type: 'updateUser'; payload: IUser };

export const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'signIn':
      return { logged: true, user: action.payload } as AuthReducerState;
    case 'signOut':
      return { logged: false, user: null } as AuthReducerState;
    case 'updateUser':
      return { logged: true, user: action.payload } as AuthReducerState;

    default:
      return state;
  }
};
