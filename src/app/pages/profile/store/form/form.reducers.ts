import { PersonalForm } from '../../pages/form/components/personal/personal.component';
import { ProfessionalForm } from '../../pages/form/components/professional/professional.component';
import { ProfileForm } from '../../pages/form/form.component'
import * as fromActions from './form.actions';

export type FormState = ProfileForm;

const initialState: FormState = {
  personal: {} as PersonalForm,
  professional: {} as ProfessionalForm,
}

export function reducer(
  state = initialState,
  action: fromActions.All
): FormState {
  switch (action.type) {
    case fromActions.Types.SET: {
      return { ...state, ...action.form };
    };
    case fromActions.Types.UPDATE: {
      return { ...state, ...action.changes };
    };
    case fromActions.Types.CLEAR: {
      return { ...initialState };
    };
    default: return state;
  }
}
