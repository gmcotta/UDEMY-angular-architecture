import { Dictionaries } from './dictionaries.models';
import * as fromActions from './dictionaries.actions';

export interface DictionariesState {
  entities: Dictionaries;
  loading: boolean;
  error: string;
}

const initialState: DictionariesState = {
  entities: {} as Dictionaries,
  loading: false,
  error: '',
};

export function reducer(
  state = initialState, 
  action: fromActions.All
): DictionariesState {
  switch (action.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: '' };
    }
    case fromActions.Types.READ_SUCCESS: {
      const entities = action.dictionaries;
      return { ...state, loading: false, error: '', entities };
    }
    case fromActions.Types.READ_ERROR: {
      const error = action.error;
      return { ...state, loading: false, error };
    }
    default: return state;
  }
}
