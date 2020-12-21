import { User } from '@app/models/backend';
import * as fromActions from './user.actions';
import {} from './user.models';

export interface UserState {
  entity: User | undefined;
  uid: string | undefined | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: UserState = {
  entity: {} as User,
  uid: null,
  loading: null,
  error: null,
}

export function reducer(
  state = initialState, 
  action: fromActions.All
): UserState {
  switch (action.type) {
    case fromActions.Types.INIT: {
      return {
        ...state,
        loading: true,
      };
    };
    case fromActions.Types.INIT_AUTHORIZED: {
      return {
        ...state,
        uid: action.uid,
        entity: action.user,
        loading: false,
        error: null,
      };
    };
    case fromActions.Types.INIT_UNAUTHORIZED: {
      return {
        ...state,
        loading: false,
        entity: {} as User,
        error: null,
      };
    };
    case fromActions.Types.INIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    };

    case fromActions.Types.SIGN_IN_EMAIL: {
      return { 
        ...state, 
        loading: true, 
      };
    };
    case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
      return { 
        ...state, 
        entity: action.user, 
        uid: action.uid,
        loading: false,
      };
    };
    case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
      return { 
        ...state, 
        error: action.error, 
        loading: false, 
      };
    };
    
    case fromActions.Types.SIGN_UP_EMAIL: {
      return { 
        ...state, 
        loading: true, 
      };
    };
    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
      return { 
        ...state,
        uid: action.uid,
        loading: false,
      };
    };
    case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
      return { 
        ...state,
        error: action.error,
        loading: false,
      };
    };
    
    case fromActions.Types.SIGN_OUT: {
      return { 
        ...state, 
        loading: true, 
      };
    };
    case fromActions.Types.SIGN_OUT_SUCCESS: {
      return { 
        ...initialState
      };
    };
    case fromActions.Types.SIGN_OUT_ERROR: {
      return { 
        ...state, 
        loading: false,
        error: action.error,
      };
    };

    case fromActions.Types.CREATE: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    };
    case fromActions.Types.CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        entity: action.user,
      };
    };
    case fromActions.Types.CREATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    };
    
    case fromActions.Types.UPDATE: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    };
    case fromActions.Types.UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        entity: action.user,
      };
    };
    case fromActions.Types.UPDATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    };
    
    default: return { ...state };
  }
}