import { createSelector } from '@ngrx/store';
import { ProfileState } from '..';
import { getProfileState } from '../user/user.selectors';
import { FormState } from './form.reducers';

export const getFormState = createSelector(
  getProfileState, 
  (state: ProfileState) => state.form
);

export const getPersonalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.personal && state.personal
);

export const getProfessionalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.professional && state.professional
);
