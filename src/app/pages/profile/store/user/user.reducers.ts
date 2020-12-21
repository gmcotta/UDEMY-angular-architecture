import * as fromActions from './user.actions';
import { User } from './user.models';

export interface UserState {
  entity: User | null | undefined,
  loading: boolean | null,
  error: string | null,
}

const initialState: UserState = {
  entity: null,
  loading: null,
  error: null,
}

export function reducer(
  state = initialState,
  actions: fromActions.All
): UserState  {
  switch(actions.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, entity: null, error: null };
    };

    case fromActions.Types.READ_SUCCESS: {
      return { ...state, loading: false, entity: actions.user, error: null };
    };

    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, entity: null, error: actions.error };
    };

    case fromActions.Types.CLEAR: {
      return { ...initialState };
    }

    default: return { ...initialState };
  }
}