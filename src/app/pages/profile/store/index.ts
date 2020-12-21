import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromFormActions from './form/form.actions';
import * as fromForm from './form/form.reducers';
import * as fromUser from './user/'

export interface ProfileState {
  form: fromForm.FormState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<
  ProfileState, 
  fromFormActions.All & fromUser.All
> = {
  form: fromForm.reducer,
  user: fromUser.reducer,
}

export const effects: any[] = [
  fromUser.UserEffects,
];
