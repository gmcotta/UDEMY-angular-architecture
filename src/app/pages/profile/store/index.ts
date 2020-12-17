import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromActions from './form/form.actions';
import * as fromForm from './form/form.reducers';

export interface ProfileState {
  form: fromForm.FormState;
}

export const reducers: ActionReducerMap<ProfileState, fromActions.All> = {
  form: fromForm.reducer
}

export const effects: any[] = [];

export const getProfileState = createFeatureSelector<ProfileState>('profile');
