import { UserState } from './user.reducers';
import { createSelector } from '@ngrx/store';
import { getProfileState, ProfileState } from '..';

export const getUserState = createSelector(
  getProfileState,
  (state: ProfileState) => state.user
);

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.entity
);

export const getLoading = createSelector(
  getUserState, 
  (state: UserState) => state.loading
);

export const getRole = createSelector(
  getUserState,
  (state: UserState) => state.entity?.role
);
